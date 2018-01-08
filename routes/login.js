var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
var passport = require('passport');
var localStrategy = require('passport-local');

// passport.use(new localStrategy(User.authenticate));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login form' });
});


// router.post('/', function (req,res) {
//     console.log(req);
//   res.send(req.body);
//
// });



router.post('/',passport.authenticate('local',{
        //successRedirect: '/secret'+req.user.username,
        failureRedirect: '/login'
    }
),function(req, res){
  res.redirect('/secret/' + req.user.username);
});

module.exports = router;
