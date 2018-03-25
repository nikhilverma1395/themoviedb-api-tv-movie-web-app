var mongoose = require('mongoose');
var schema = mongoose.Schema;

module.exports = mongoose.model('User', new schema({
    Funame: {type: String, required: true},
    Lname: {type: String},
    uname: {type: String, unique: true, required: true, index: {unique: true}},
    email: {type: String, required: true},
    password: {type: String, required: true},
    admin: {type: Boolean, required: true, default: false}
}));