var mongoose = require('mongoose');
var schema = mongoose.Schema;
var voucherSchema = {};
var voucherModel;

var database = {
    connect: function () {
        mongoose.connect('mongodb://localhost:27017/wad_project', function (err) {
            if (err == null) {
                console.log("Connected to Mongo DB");
                voucherSchema = schema({
                    name: String,
                    value: Number,
                });
                var connection = mongoose.connection;
                voucherModel = connection.model("vouchers" , voucherSchema);
            } else {
                console.log("Error connecting to Mongo DB");
            }
        })
    },
    addvoucher: function(name, value,callback)
    {
        var newVoucher = new voucherModel({
            name:name,
            value:value
        });
        newVoucher.save(callback);
    },

    getvoucher: function(callback){
        voucherModel.find({}, callback);
    },

    getvoucherbyid: function(id,callback){
        voucherModel.findById(id,callback);
    },

    updatevoucher: function(id, name, value, callback){
        voucherModel.findByIdAndUpdate(id,{name:name,value:value},callback);
    },

    deletevoucher: function(id,callback){
        voucherModel.findByIdAndRemove(id,callback);
    },
}
module.exports = database;