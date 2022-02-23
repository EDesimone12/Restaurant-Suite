const { MenuBooking } = require('./menuBooking');
const {
    // eslint-disable-next-line no-unused-vars
    AttachmentPrompt,
    ChoiceFactory,
    ChoicePrompt,
    ComponentDialog,
    ConfirmPrompt,
    DialogSet,
    DialogTurnStatus,
    NumberPrompt,
    TextPrompt,
    WaterfallDialog
} = require('botbuilder-dialogs');
const PRENOTAZIONE_PROMPT = 'PRENOTAZIONE_PROMPT';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';
const MENU_BOOKING = 'MENU_BOOKING';

class OrderDialog extends ComponentDialog {
    constructor(id, userState) {
        super('ORDER_DIALOG');
        this.addDialog(new TextPrompt(PRENOTAZIONE_PROMPT, this.ordinazionePromptValidator));
        this.addDialog(new MenuBooking(MENU_BOOKING, userState));

        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.showMenu.bind(this),
            this.doOrder.bind(this),
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

    async showMenu(step) {
        return await step.beginDialog(MENU_BOOKING, this.userState);
    }

    async doOrder(step) {
        const promptOptions = { prompt: 'Fai la tua ordinazione inserendo i codici delle pietanze, presenti sul menu, e il numero di portate.(Es. 01X02,02X12).', retryPrompt: "L'ordinazione deve essere nel seguente formato: 01X02,02X12." };
        return await step.prompt(PRENOTAZIONE_PROMPT, promptOptions);
    }

    async ordinazionePromptValidator(promptContext) {
        var control;
        var ordinazione = promptContext.recognized.value;
        var espressione = /([0-9]{2}[Xx][0-9]{2},)*[0-9]{2}[Xx][0-9]{2}/;
        if (promptContext.recognized.succeeded) {
            if (espressione.test(ordinazione)) {
                control = true;
            }
        } else {
            control = false;
        }
        return control;
    }

    async summaryStep(step) {
        await step.context.sendActivity('La tua ordinazione: ' + step.result);
        return await step.endDialog(step.result);
    }
}
module.exports.OrderDialog = OrderDialog;
