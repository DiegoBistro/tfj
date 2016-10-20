var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = new Schema(
{
    firstname: String,
    lastname: String,
    nickname: String,
    email: String,
    password: String,
    cellulare: String,
    gender: String,
    image: String,
    city: String,
    tipo: String, //cerco e/o offro lavoro
    skills: Array,
    descrizione: String,
    annunci: Array, // i miei post
    feedback: Array,
    certificazione: Array,

    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

// methods ======================
// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
var User = mongoose.model('users', UserSchema);
module.exports = User;

