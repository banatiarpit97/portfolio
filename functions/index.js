const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

exports.sendContactMessage = functions.database.ref('/contact/{pushKey}').onWrite(event => {
    const snapshot = event.data;
        if (snapshot.previous.val() || !snapshot.val().name) {
            return;
        }

    const val = snapshot.val();
    let html = '<table border="1">'+
                    '<tr><td>Name</td><td>'+val.name+'</td></tr>'+
                    '<tr><td>Email</td><td>'+val.email+'</td></tr>'+
                    '<tr><td>Number</td><td>'+val.number+'</td></tr>'+
                    '<tr><td>Regarding</td><td>' + val.regarding + '</td></tr>'+
                    '<tr><td>Message</td><td>' + val.message + '</td></tr>'+
                '</table>';

    const gmailEmail = encodeURIComponent(functions.config().gmail.email);
    const gmailPassword = encodeURIComponent(functions.config().gmail.password);
    const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);
    const mailOptions = {
        to: 'banatiarpit97@yahoo.co.in',
        subject: 'Website Contact Us',
        html: html
    };
        
    return mailTransport.sendMail(mailOptions).then(() => {
        return console.log('Mail sent')
    });
});