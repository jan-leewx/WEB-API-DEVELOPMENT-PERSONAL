var mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema = {};
var userModel;

var database = {
    connect: function () {
        mongoose.connect('mongodb://localhost:27017/wad_project', function (err) {
            if (err == null) {
                console.log("Connected to Mongo DB");
                //initialize values
                userSchema = schema({
                    name: String,
                    email: String,
                    phoneNumber: String,
                    password: String,
                    address: String,
                    role: String,
                    token: String
                });
                var connection = mongoose.connection;
                userModel = connection.model("users", userSchema);
            } else {
                console.log("Error connecting to Mongo DB");
            }
        })
    },
    getUser: function(callback){
        userModel.find({}, callback);
    },
    addUser: function(name, email, phoneNum, password, callback)
    {
        var newUser = new userModel({
            // role:role,
            name:name,
            email:email,
            phoneNumber:phoneNum,
            password:password,
            address:null,
            role: "customer",
        });
        newUser.save(callback);
    },
    login: function (e, p, callback) {
        userModel.findOne({ email: e, password: p }, callback);
    },
    updateToken: function (id, token, callback) {
        userModel.findByIdAndUpdate(id, { token: token }, callback);
    },
    checkToken: function(token,callback) {
        userModel.findOne({token:token},callback);
    },
    removeToken: function(id,callback) {
        userModel.findByIdAndUpdate(id, {$unset: {token: 1}},callback);
    },
    getUserbytoken: function(token,callback){
        userModel.findOne({token},callback);
    },
    updateuser: function(id, name, password, phoneNumber, address, callback){
        userModel.findByIdAndUpdate(id, {name:name,password:password,phoneNumber:phoneNumber,address:address},callback);
    },
}
module.exports = database;