var mongoose = require('mongoose');
var User = require('../models/userModel');
var nev = require('email-verification')(mongoose);

nev.generateTempUserModel(User, function(err, tempUserModel){
    if (err){
        console.log('nev generateTempUserModel error:')
        console.log(err);
    } else{
        nev.configure({
            verificationURL: 'http://example.com/email-verification/${URL}',
            URLLength: 48,

            // mongo-stuff
            persistentUserModel: null,
            tempUserModel: tempUserModel,
            tempUserCollection: 'temporary_users',
            emailFieldName: 'email',
            passwordFieldName: 'password',
            URLFieldName: 'GENERATED_VERIFYING_URL',
            expirationTime: 86400,

            // emailing options
            transportOptions: {
                service: 'Gmail',
                auth: {
                    user: 'user@gmail.com',
                    pass: 'password'
                }
            },
            verifyMailOptions: {
                from: 'Do Not Reply <user@gmail.com>',
                subject: 'Confirm your account',
                html: '<p>Please verify your account by clicking <a href="${URL}">this link</a>. If you are unable to do so, copy and ' +
                'paste the following link into your browser:</p><p>${URL}</p>',
                text: 'Please verify your account by clicking the following link, or by copying and pasting it into your browser: ${URL}'
            },
            shouldSendConfirmation: true,
            confirmMailOptions: {
                from: 'Do Not Reply <user@gmail.com>',
                subject: 'Successfully verified!',
                html: '<p>Your account has been successfully verified.</p>',
                text: 'Your account has been successfully verified.'
            },

            hashingFunction: null,
        }, function(err){
            if (err) {
                console.log('nev config error:')
                console.log(err);
            }
        });
    }

});




module.exports = nev;