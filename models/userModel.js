var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var useSchema = new mongoose.Schema(
    {
        username : String,
        password : String,
        email: String
    }
)

useSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', useSchema);

module.exports = User;