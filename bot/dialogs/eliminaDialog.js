const fs = require('fs');
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
const CHOICE_PROMPT = 'CHOICE_PROMPT';
const CONFIRM_PROMPT = 'CONFIRM_PROMPT';
const NAME_PROMPT = 'NAME_PROMPT';
const DATE_PROMPT = 'DATE_PROMPT';
const NUMBER_PROMPT = 'NUMBER_PROMPT';

const WATERFALL_DIALOG = 'WATERFALL_DIALOG';

class EliminaDialog extends ComponentDialog {
    constructor(id, userState) {
        super('ELIMINA_DIALOG');
        this.addDialog(new TextPrompt(NAME_PROMPT));
        this.addDialog(new TextPrompt(DATE_PROMPT, this.datePromptValidator));
        this.addDialog(new ChoicePrompt(CHOICE_PROMPT));
        this.addDialog(new NumberPrompt(NUMBER_PROMPT, this.numberPromptValidator));
        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT));

        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.numberStep.bind(this),
            this.dateStep.bind(this),
            this.timeStep.bind(this),
            this.eliminationConfirmStep.bind(this),
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

    async numberStep(step) {
        const promptOptions = { prompt: 'Perfavore inserisci il codice della prenotazione che vuoi eliminare.', retryPrompt: 'Il numero può essere compreso tra 0 e 3000.' };
        return await step.prompt(NUMBER_PROMPT, promptOptions);
    }

    async numberPromptValidator(promptContext) {
        return promptContext.recognized.succeeded && promptContext.recognized.value > 0 && promptContext.recognized.value < 3000;
    }

    async dateStep(step) {
        step.values.codPrenotazione = step.result;
        const promptOptions = { prompt: 'Inserisci la data della prenotazione che vuoi eliminare.', retryPrompt: 'La data deve essere nel seguente formato: aaaa-mm-gg.' };
        return await step.prompt(DATE_PROMPT, promptOptions);
    }

    async datePromptValidator(promptContext) {
        var data = promptContext.recognized.value;
        var espressione = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
        var control;
        if (promptContext.recognized.succeeded) {
            if (espressione.test(data)) {
                var anno = parseInt(data.substr(0, 4), 10);
                var mese = parseInt(data.substr(5, 2), 10);
                var giorno = parseInt(data.substr(8), 10);
                var datanew = new Date(anno, mese - 1, giorno);
                if (datanew.getFullYear() === anno && datanew.getMonth() + 1 === mese && datanew.getDate() === giorno) {
                    control = true;
                }
            }
        } else {
            control = false;
        }
        return control;
    }

    async timeStep(step) {
        step.values.date = step.result;
        return await step.prompt(CHOICE_PROMPT, {
            prompt: "Inserisci l'orario.",
            choices: ChoiceFactory.toChoices(['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '20:00', '20:30', '21:00', '22:00', '23:00', '24:00'])
        });
    }

    async eliminationConfirmStep(step) {
        step.values.time = step.result.value;
        return await step.prompt(CONFIRM_PROMPT, 'Sei sicuro di voler eliminare la prenotazione?', ['Yes', 'No']);
    }

    async summaryStep(step) {
        const orario = step.values.time + ':00';
        const data = step.values.date;
        const codPrenotazione = step.values.codPrenotazione;
        const username = step.context.activity.from.name;

        if (step.result) {
            var mysql = require('mysql');
            const serverCa = [fs.readFileSync('BaltimoreCyberTrustRoot.crt.pem', 'utf8')];
            var con = mysql.createConnection({
                host: process.env.My_SQL_HOST,
                user: process.env.My_SQL_USER,
                password: process.env.My_SQL_PSW,
                database: 'restaurantSuite',
                ssl: {
                    rejectUnauthorized: true,
                    ca: serverCa
                }
            });

            // eslint-disable-next-line camelcase,no-inner-declarations
            function query_promise() {
                return new Promise((resolve, reject) => {
                    con.connect(function(err) {
                        if (err) throw err;
                        var sql = 'Delete from  prenotazione where data = ? and codPrenotazione = ? and username = ? and orario = ?';
                        con.query(sql, [data, codPrenotazione, username, orario], function(err, result) {
                            console.log(data, codPrenotazione, username, orario);
                            if (err) throw reject(err);
                            resolve(result.affectedRows);
                        });
                    });
                });
            };
            var res = await query_promise();
            if (res === 0) {
                await step.context.sendActivity('La tua prenotazione non è stata eliminata, forse hai inserito parametri sbagliati.');
            } else if (res === 1) {
                await step.context.sendActivity('La tua prenotazione è stata eliminata.');
            }
        } else {
            await step.context.sendActivity('La tua prenotazione non è stata eliminata.');
        }
        await step.context.sendActivity('Per interagire nuovamente con il bot invia prima un messaggio e poi inserisci il comando');
        return await step.endDialog();
    }
}

module.exports.EliminaDialog = EliminaDialog;
