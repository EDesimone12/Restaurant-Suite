const { MainDialog } = require('./mainDialog');
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
const {
    // eslint-disable-next-line no-unused-vars
    AttachmentPrompt,
    ChoiceFactory,
    ChoicePrompt,
    ComponentDialog,
    // eslint-disable-next-line no-unused-vars
    ConfirmPrompt,
    DialogSet,
    DialogTurnStatus,
    // eslint-disable-next-line no-unused-vars
    NumberPrompt,
    // eslint-disable-next-line no-unused-vars
    TextPrompt,
    WaterfallDialog
} = require('botbuilder-dialogs');
const CHOICE_PROMPT = 'CHOICE_PROMPT';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';


class MenuBooking extends ComponentDialog {
    constructor(id, userState) {
        super('MENU_BOOKING');
        this.addDialog(new ChoicePrompt(CHOICE_PROMPT));
        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.languageStep.bind(this),
            this.menuStep.bind(this)
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

    async languageStep(step) {
        return await step.prompt(CHOICE_PROMPT, {
            prompt: 'Scegli la lingua.',
            choices: ChoiceFactory.toChoices(['Italiano', 'Spagnolo', 'Inglese'])
        });
    }

    async menuStep(step) {
        step.values.language = step.result;
        var lang = step.values.language;
        var language;
        if (lang.value === 'Inglese') {
            language = 0;
        } else if (lang.value === 'Spagnolo') {
            language = 1;
        } else if (lang.value === 'Italiano') {
            language = 2;
        }

        // eslint-disable-next-line camelcase
        function query_promise() {
            return new Promise((resolve, reject) => {
                var i;
                var subscriptionKey = process.env.My_TRA_KEY;
                var endpoint = process.env.My_END_TRA;
                var location = 'westeurope';

                axios({
                    baseURL: endpoint,
                    url: '/translate',
                    method: 'post',
                    headers: {
                        'Ocp-Apim-Subscription-Key': subscriptionKey,
                        'Ocp-Apim-Subscription-Region': location,
                        'Content-type': 'application/json',
                        'X-ClientTraceId': uuidv4().toString()
                    },
                    params: {
                        'api-version': '3.0',
                        from: 'it',
                        to: ['en', 'es', 'it']
                    },
                    data: [{
                        text: '**MENU:** \r \n **01 Prosciutto e Mozzarella** ' +
                            ' _Prosciutto Crudo San Daniele, Mozzarella_ ' +
                            '€5.95   \r \n           ' +
                            '**02 Cocktail di Gamberi** ' +
                            ' _Gamberetti, Ketchup, Maionese, Lattuga_ ' +
                            '€7.95     \r \n          ' +
                            '**03 Mozzarella Stick** ' +
                            ' _Mozzarella stick impanati e fritti_ ' +
                            '€4.95        \r \n           ' +
                            '**04 Insalata di Mare** ' +
                            ' _Polpo, Calamari,Gamberi, Sedano, Aceto_ ' +
                            '€4.95         \r \n          ' +
                            '**05 Spaghetti alla Norma**' +
                            ' _Salsa di Pomodoro, Melanzane, Ricotta salata_ ' +
                            '€8.95        \r \n            ' +
                            '**06 Spaghetti con le cozze**' +
                            ' _Spaghetti, cozze, prezzemolo_ ' +
                            '€8.95         \r \n' +
                            '**07 Spaghetti al Nero di Seppia** ' +
                            ' _Seppie,Prezzemolo, Aglio, Peperoncino, Vino bianco_ ' +
                            '€8.95        \r \n              ' +
                            '**08 Filetto di salmone**' +
                            ' _Salmone, Limone, Olio_ ' +
                            '€9.95         \r \n              ' +
                            '**09 Bistecca con patatine** ' +
                            ' _Bistecca di Angus con patatine_ ' +
                            '€9.95          \r \n             ' +
                            '**10 Salsiccia di Cinghiale Nero** ' +
                            ' _Salsiccia di Cinghiale Nero, Lattuga, Aceto Balsamico_ ' +
                            '€12.95 \r \n'

                    }],
                    responseType: 'json'
                }).then(function(response) {
                    i = (JSON.stringify(response.data));
                    var c = JSON.parse(i);
                    resolve(c[0].translations[language].text);
                });
            });
        };
        var res = await query_promise();
        await step.context.sendActivity('' + res);
        return await step.endDialog();
    }
}

module.exports.MenuBooking = MenuBooking;
