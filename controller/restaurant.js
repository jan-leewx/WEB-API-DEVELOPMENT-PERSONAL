var mongoose = require('mongoose');
var schema = mongoose.Schema;
var restaurantSchema = {};
var restaurantModel;

var database = {
    connect: function () {
        mongoose.connect('mongodb://localhost:27017/wad_project', function (err) {
            if (err == null) {
                console.log("Connected to Mongo DB");
                //initialize values
                restaurantSchema = schema({
                    name: String,
                    type: String,
                    img_path: String,
                    description: String,
                    open_hours: String
                });
                var connection = mongoose.connection;
                restaurantModel = connection.model("restaurants", restaurantSchema);
            } else {
                console.log("Error connecting to Mongo DB");
            }
        })
    },
    addRestaurant: function(name, type, img, description, open_hours, callback)
    {
        var newRestaurant = new restaurantModel({
            name:name,
            type:type,
            img_path:img,
            description:description,
            open_hours:open_hours
        });
        newRestaurant.save(callback);
    },

    getRestaurant: function(callback){
        restaurantModel.find({}, callback);
    },

    getRestaurantById: function(id,callback){
        restaurantModel.findById(id,callback);
    },

    updateRestaurant: function(id, name, type, img, description, open_hours, callback){
        restaurantModel.findByIdAndUpdate(id,{name:name,type:type,img_path:img,description:description,open_hours:open_hours},callback);
    },

    deleteRestaurant: function(id,callback){
        restaurantModel.findByIdAndRemove(id,callback);
    },
}
module.exports = database;