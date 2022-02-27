// eslint-disable-next-line no-unused-vars
const { EliminaDialog } = require('./eliminaDialog');
const { CercaDialog } = require('./cercaDialog');
// eslint-disable-next-line no-unused-vars
const { ChoicePrompt, ComponentDialog, DialogSet, DialogTurnStatus, TextPrompt, ImagePrompt, WaterfallDialog } = require('botbuilder-dialogs');
const { BookingDialog } = require('./bookingDialog');
const { MenuDialog } = require('./menuDialog');
const MAIN_DIALOG = 'MAIN_DIALOG';
const BOOKING_DIALOG = 'BOOKING_DIALOG';
const MENU_DIALOG = 'MENU_DIALOG';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';
const CERCA_DIALOG = 'CERCA_DIALOG';
const ELIMINA_DIALOG = 'ELIMINA_DIALOG';

class MainDialog extends ComponentDialog {
    constructor(userState) {
        super(MAIN_DIALOG);
        this.userState = userState;
        this.addDialog(new ChoicePrompt('cardPrompt'))
            .addDialog(new BookingDialog(BOOKING_DIALOG, userState))
            .addDialog(new MenuDialog(MENU_DIALOG, userState))
            .addDialog(new CercaDialog(CERCA_DIALOG, userState))
            .addDialog(new EliminaDialog(ELIMINA_DIALOG, userState))
            .addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
                this.initialStep.bind(this),
                this.invokeStep.bind(this),
                this.finalStep.bind(this)
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

    async initialStep(stepContext) {
        const options = {
            prompt: 'Cosa vuoi fare?',
            choices: this.getChoices()
        };
        return await stepContext.prompt('cardPrompt', options);
    }

    async invokeStep(stepContext) {
        var result = stepContext.result.value;
        if (result === 'Prenotazione') {
            return await stepContext.beginDialog(BOOKING_DIALOG, this.userState);
        } else if (result === 'Menu') {
            return await stepContext.beginDialog(MENU_DIALOG, this.userState);
        } else if (result === 'Cerca') {
            return await stepContext.beginDialog(CERCA_DIALOG, this.userState);
        } else if (result === 'Elimina prenotazione') {
            return await stepContext.beginDialog(ELIMINA_DIALOG, this.userState);
        }
    }

    async finalStep(stepContext) {
        return await stepContext.endDialog();
    }

    getChoices() {
        var cardOptions;
        cardOptions = [
            {
                value: 'Prenotazione',
                synonyms: ['prenota', '/prenotazione']
            },
            {
                value: 'Menu',
                synonyms: ['menu', 'menù', '/menu']
            },
            {
                value: 'Cerca',
                synonyms: ['cerca', '/cerca']
            },
            {
                value: 'Elimina prenotazione',
                synonyms: ['elimina', '/elimina']
            }
        ];
        return cardOptions;
    }
}

module.exports.MainDialog = MainDialog;
module.exports.MAIN_DIALOG = MAIN_DIALOG;
