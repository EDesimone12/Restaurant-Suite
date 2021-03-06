module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString(); //Ogni ora --> "0 0 * * * *"
                                              //Ogni 5 minuti --> "0 */5 * * * *"
    if (myTimer.isPastDue)                    // Oggni mezz'ora -->0 */30 * * * *
    {
        context.log('JavaScript is running late!');
    }
    context.log('JavaScript timer trigger function ran!', timeStamp);

const fs = require('fs');
var mysql = require('mysql');
const moment = require('moment');
const axios = require('axios').default;

var telegramToken = process.env.TELEGRAM_RESTAURANT_BOT_TOKEN;
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

var today = new Date();
var date = [moment(today).format('YYYY-MM-DD')];
var currentTime = today.getHours()+1+":"+today.getMinutes()+":"+today.getSeconds();

console.log(date);

var userID;
var orario;

console.log("Connecting . . .");

con.connect(function(err) {
    if (err) throw err;
    console.log('Connected!');
    const sql = 'SELECT * FROM prenotazione WHERE data = ? and orario > ?';
    con.query(sql, [date,currentTime],function(err, result) {
        if (err) throw err;

        Object.keys(result).forEach(function(key) {
            var row = result[key];
            userID = row.userID;
            orario = row.orario.split(".");
            orario = orario[0].split(":");
            console.log(orario[0]);

            var bookingTimeHH = parseInt(orario[0],10);
            var bookingTImeMM = parseInt(orario[1],10);
            var currentHH = today.getHours();
            currentHH = parseInt(currentHH)+1;
            var currentMM = today.getMinutes();
            currentMM = parseInt(currentMM);

            if(bookingTimeHH >= currentHH ){
                console.log("Orario corrente precedente a quello di prenotazione...");

                var diffHH = bookingTimeHH - currentHH;
                var msgTG;
                var checked = false; 
                if((diffHH == 0) && (bookingTImeMM == 30) ){
                    msgTG = "Ricordati che tra mezz'ora Restaurant-Suite ti aspetta!";
                    console.log("Sending Telegram message. . .");
                    axios
                    .get("https://api.telegram.org/bot"+telegramToken+"/sendMessage?chat_id="+userID+
                        "&text="+msgTG)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(error => {
                        console.error(error);
                    });
                    checked = true;
                }else if((diffHH == 1) && (bookingTImeMM == 00) && (checked == false) && (bookingTImeMM != currentMM)){
                    msgTG = "Ricordati che tra mezz'ora Restaurant-Suite ti aspetta!";
                    console.log("Sending Telegram message. . .");
                    axios
                    .get("https://api.telegram.org/bot"+telegramToken+"/sendMessage?chat_id="+userID+
                        "&text="+msgTG)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(error => {
                        console.error(error);
                    });
                }

            }
        });
    });
});

};