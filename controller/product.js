var mongoose = require('mongoose');
var schema = mongoose.Schema;
var productSchema = {};
var productModel;

var database = {
    connect: function () {
        mongoose.connect('mongodb://localhost:27017/wad_project', function (err) {
            if (err == null) {
                console.log("Connected to Mongo DB");
                //initialize values
                productSchema = schema({
                    name: String,
                    price: Number,
                    restaurant: String,
                    description: String,
                    img_path: String
                });
                var connection = mongoose.connection;
                productModel = connection.model("products", productSchema);
            } else {
                console.log("Error connecting to Mongo DB");
            }
        })
    },
    getProduct: function(callback){
        productModel.find({}, callback);
    },
    addProduct: function(name, price, restaurant, image, description, callback)
    {
        var newProduct = new productModel({
            name:name,
            price:price,
            restaurant:restaurant,
            image:image,
            description:description
        });
        newProduct.save(callback);
    },

    getProductById: function(id,callback)
    {
        productModel.findById(id,callback);
    },
    updateProduct: function(id, price, image, description, callback){
        productModel.findByIdAndUpdate(id,{price:price,image:image,description:description},callback);
    },
    deleteProduct: function(id,callback){
        productModel.findByIdAndRemove(id,callback);
    },
}
module.exports = database;