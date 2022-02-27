module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

const fs = require('fs');
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

//I have to get parameters
console.log("Loading parameters. . .");
const cod = (req.query.cod || (req.body && req.body.cod));
const cognome = (req.query.cognome || (req.body && req.body.cognome));
const username = (req.query.username || (req.body && req.body.username));
const userID = (req.query.userID || (req.body && req.body.userID));
const nPersone = (req.query.nPersone || (req.body && req.body.nPersone));
const ordinazioni = (req.query.ordinazioni || (req.body && req.body.ordinazioni));
const orario = (req.query.orario || (req.body && req.body.orario));
const data = (req.query.data || (req.body && req.body.data));

con.connect(function(err) {
    if (err) throw err;
    console.log('Connected!');
    const sql = 'INSERT INTO prenotazione (codPrenotazione, cognome, username,userID, nPersone, ordinazioni, orario, data) VALUES ?';
    const values = [
        [cod, cognome, username,userID, nPersone, ordinazioni, orario, data]
    ];
    con.query(sql, [values], function(err, result) {
        if (err) throw err;
        alert("Result:"+result[0]);
    });
});

    const newLine = ' \r \n';
    const responseMessage = 'Prenotazione effettuata con successo!' + newLine +
    ' Codice Prenotazione: '+ cod + newLine +
    ' Data:  ' + data + newLine +
    ' Orario:  ' + orario + newLine +
    ' Cognome:  ' + cognome + newLine +
    ' Numero di persone:  ' + nPersone + newLine +
    ' Ordinazioni:  ' + ordinazioni + newLine;

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}