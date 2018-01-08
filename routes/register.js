var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
var passport = require('passport');

var nev = require('../midleware/nevConfig');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register form' , error: undefined });
});

router.post('/', function(req, res, next) {
  User.register(new User({username: req.body.username}),req.body.password, function(err,user){
    if (err){
      console.log(err);
      //res.redirect('/register');
      var error = {message: "Registration error"};
      res.render('register', { title: 'Register form',error:error });
    }else{
      //console.log(user);
      nev.createTempUser(user,function(err,newTempUser){
        if (err){
            console.log('Temp user create error');
            console.log(err);
        }else{
            console.log('temp user');
            console.log(newTempUser);
        }
      });
      passport.authenticate('local')(req, res,function(){
        res.redirect('/secret/'+user.username);
      });

    }
  });
});


module.exports = router;
