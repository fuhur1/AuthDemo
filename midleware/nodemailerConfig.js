var nodemailer = require('nodemailer');
var smtpTransport = nodemailer.createTransport({
    from: 'replyemail@example.com',
    options: {
        host: 'smtp.example.com',
        port: 587,
        auth: {
            user: 'your_smtp_username',
            pass: 'your_smtp_email'
        }
    }
);

module.exports smtpTransport;