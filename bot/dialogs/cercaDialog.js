const {
    // eslint-disable-next-line no-unused-vars
    AttachmentPrompt,
    ChoiceFactory,
    ChoicePrompt,
    ComponentDialog,
    ConfirmPrompt,
    DialogSet,
    DialogTurnStatus,
    // eslint-disable-next-line no-unused-vars
    NumberPrompt,
    TextPrompt,
    WaterfallDialog
} = require('botbuilder-dialogs');
const ATTACHMENT_PROMPT = 'ATTACHMENT_PROMPT';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';
const INSERT_PROMPT = 'INSERT_PROMPT';

class CercaDialog extends ComponentDialog {
    constructor(id, userState) {
        super('CERCA_DIALOG');
        this.addDialog(new ConfirmPrompt(INSERT_PROMPT));
        this.addDialog(new AttachmentPrompt(ATTACHMENT_PROMPT));
        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.questionStep.bind(this),
            this.invioFotoStep.bind(this),
            this.insertImageStep.bind(this),
            this.summaryStep.bind(this)
        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    /**
     * The run method handles the incoming activity (in the form of a TurnContext) and passes it through the dialog system.
     * If no dialog is active, it will start the default dialog.
     * @param {*} turnContext
     * @param {*} accessor
     */
    async run(turnContext, accessor) {
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);

        const dialogContext = await dialogSet.createContext(turnContext);
        const results = await dialogContext.continueDialog();
        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
    }

    async questionStep(step) {
        return await step.prompt(INSERT_PROMPT, "Vuoi inserire un'immagine di una pietanza e vedere se c'è qualcosa di simile nel nostro menù?", ['Yes', 'No']);
    }

    async invioFotoStep(step) {
        if (step.result) {
            return await step.prompt(ATTACHMENT_PROMPT, "Ora carica l'immagine.");
        } else {
            step.context.sendActivity('Per eseguire altre azioni invia un messaggio.');
            return await step.endDialog();
        }
    }

    async insertImageStep(step) {
        await step.context.sendActivity(step);
        var url = step.result[0].contentUrl;
        const async = require('async');
        const fs = require('fs');
        const https = require('https');
        const path = require('path');
        const createReadStream = require('fs').createReadStream;
        const sleep = require('util').promisify(setTimeout);
        const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
        const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;

        /**
             * AUTHENTICATE
             * This single client is used for all examples.
             */
        const key = process.env.My_VISION_KEY;
        const endpoint = process.env.My_VISION_END;
        const computerVisionClient = new ComputerVisionClient(new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);
        const menuDaVisualizzare = ['**01 Ham e Mozzarella** _Ham Crudo San Daniele, Mozzarella_ €5.95',
            '**02 Shrimp Cocktail** _Gamberetti, Ketchup, Mayonnaise, Lettuce_ €7.95',
            '**03 Mozzarella Stick** _Mozzarella breaded sticks and fries_ €4.95',
            '**04 Seafood Salad** _Octopus, Squid, Shrimp, Celery, Aceto_ €4.95',
            '**05 Spaghetti alla Norma** _Salsa of Tomato, Eggplant, Ricotta salata_ €8.95, pasta',
            '**06 Spaghetti whit mussel** _Spaghetti, Mussel, parsley_ €8.95, pasta',
            '**07 Spaghetti with Squid Ink** _Seppie, Parsley, Garlic, Chilli, white wine_ €8.95, pasta',
            '**08 Salmon fillet** _Salmon, Lemon, oil_ €9.95',
            '**09 Steak with Chips** Angus _Meat with fries_ €9.95',
            '**10 Black Boar Sausage** Black Boar _Sausage, Lettuce, Vinegar Balsamico_ €12.95'];
        const menuIt = ['**01 Prosciutto e Mozzarella**  _Prosciutto Crudo San Daniele, Mozzarella_ €5.95   \r \n           ',
            '**02 Cocktail di Gamberi** _Gamberetti, Ketchup, Maionese, Lattuga_  €7.95     \r \n          ',
            '**03 Mozzarella Stick** _Mozzarella stick impanati e fritti_ €4.95        \r \n           ',
            '**04 Insalata di Mare** _Polpo, Calamari,Gamberi, Sedano, Aceto_ €4.95         \r \n          ',
            '**05 Spaghetti alla Norma** _Salsa di Pomodoro, Melanzane, Ricotta salata_ €8.95        \r \n            ',
            '**06 Spaghetti con le cozze** _Spaghetti, cozze, prezzemolo_ €8.95         \r \n            ',
            '**07 Spaghetti al Nero di Seppia** _Seppie,Prezzemolo, Aglio, Peperoncino, Vino bianco_ €8.95\r \n',
            '**08 Filetto di salmone** _Salmone, Limone, Olio_ €9.95',
            '**09 Bistecca con patatine** _Bistecca di Angus con patatine_ €9.95  \r \n ',
            '**10 Salsiccia di Cinghiale Nero** _Salsiccia di Cinghiale Nero, Lattuga, Aceto Balsamico_ €12.95 \r \n'
        ];
        const tags = (await computerVisionClient.analyzeImage(url, { visualFeatures: ['Tags'] })).tags;
        const tagTrovati = formatTags(tags);
        let check = false;
        const nVoci = menuDaVisualizzare.length;
        const nTags = tagTrovati.length;
        const arrayVis = [];
        console.log(tagTrovati);
        for (let j = 0; j < nVoci; j++) {
            for (let i = 0; i < nTags; i++) {
                if (menuDaVisualizzare[j].toLowerCase().includes(tagTrovati[i])) {
                    console.log('tag:' + tagTrovati[i]);
                    console.log('menu:' + menuDaVisualizzare[j]);
                    if (tagTrovati[i] != 'food') {
                        check = true;
                        if (!(arrayVis.includes(menuIt[j]))) {
                            arrayVis.push(menuIt[j]);
                        }
                    }
                }
            }
        }
        for (let i = 0; i < arrayVis.length; i++) {
            await step.context.sendActivity(arrayVis[i]);
        }
        if (!check) {
            await step.context.sendActivity('La ricerca non ha dato risultati!');
        }
        // Format tags for display
        function formatTags(tags) {
            return tags.map(tag => (`${ tag.name }`));
        }
        await step.context.sendActivity('Per interagire nuovamente con il bot invia prima un messaggio e poi inserisci il comando');
        return await step.endDialog();
    }

    async summaryStep(step) {
        return await step.endDialog(step.result);
    }
}

module.exports.CercaDialog = CercaDialog;
