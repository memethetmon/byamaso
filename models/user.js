const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    username: String,
    password: String
});

//automatically take care of salting and hashing the password
UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('user', UserSchema);
module.exports = User;