var express = require('express');
var restaurant = require('./controller/restaurant.js');
var product = require('./controller/product.js');
var User = require('./controller/user.js');
var Cart = require('./controller/cart.js');
var voucher = require('./controller/voucher.js');
restaurant.connect();
product.connect();
User.connect();
voucher.connect();

var crypto = require('crypto');

var router = require('express').Router();

router.use(express.urlencoded({
    extended: true
}));
router.get('/', function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});
router.get('/view', function (req, res) {
    res.sendFile(__dirname + "/views/view_restaurant.html");
});
router.get('/account', function (req, res) {
    res.sendFile(__dirname + "/views/account.html");
});
router.get('/adminview', function (req, res) {
    res.sendFile(__dirname + "/views/admin/adminview.html");
});
router.get('/product', function (req, res) {
    res.sendFile(__dirname + "/views/view_restaurant_products.html");
});
router.get('/add', function (req, res) {
    res.sendFile(__dirname + "/views/add_restaurant.html");
});
router.get('/update', function (req, res) {
    res.sendFile(__dirname + "/views/update_restaurant.html");
});
router.get('/voucher', function (req, res) {
    res.sendFile(__dirname + "/views/view_voucher.html");
});
router.get('/addVoucher', function (req, res) {
    res.sendFile(__dirname + "/views/add_voucher.html");
});
router.get('/add_product', function (req, res) {
    res.sendFile(__dirname + "/views/add_product.html");
});
router.get('/updateVoucher', function (req, res) {
    res.sendFile(__dirname + "/views/update_voucher.html");
});
router.get('/update_user', function (req, res) {
    res.sendFile(__dirname + "/views/update_user.html");
});
router.get('/css/*', function (req, res) {
    res.sendFile(__dirname + "/views/" + req.originalUrl);
});
router.get('/js/*', function (req, res) {
    res.sendFile(__dirname + "/views/" + req.originalUrl);
});
router.get('/add_restaurant', function (req, res) {
    res.sendFile(__dirname + "/views/add_restaurant.html");
});
router.get('/update_product', function (req, res) {
    res.sendFile(__dirname + "/views/update_product.html");
});
router.get('/update_resturant', function (req, res) {
    res.sendFile(__dirname + "/views/update_restaurant.html");
});

///////////////////////////////////////////////////////////////////--restaurant routes
router.get('/api/restaurant', function (req, res) {
    restaurant.getRestaurant(function (err, Restaurants) {
        if (err) {
            res.status(500).send("Unable to get all rooms");
        } else {
            res.status(200).send(Restaurants);
        }
    })
});
router.post('/api/add_restaurant', function (req, res) {
    var data = req.body;

    restaurant.addRestaurant(data.name, data.type, data.img_path, data.description, data.open_hours, function (err, Restaurants) {
        if (err) {
            res.status(501).send();
        } else {
            res.status(200).send(Restaurants);
        }
    });
});
router.get('/api/restaurant/:id', function (req, res) {
    var id = req.params.id;
    restaurant.getRestaurantById(id, function (err, restaurant) {
        if (err) {
            res.status(500).send("unable to find the room with the entered id");
        }
        else {
            res.status(200).send(restaurant);
        }
    })
});
router.put('/api/update_restaurant/:id', function (req, res) {
    var id = req.params.id;
    var data = req.body;
    restaurant.updateRestaurant(id, data.name, data.type, data.img_path, data.description, data.open_hours, function (err, restaurant) {
        if (err) {
            res.status(501).send();
        }
        else {
            res.status(200).send(restaurant);
        }
    });

});
router.delete('/api/delete_restaurant/:id', function (req, res) {
    var id = req.params.id;
    restaurant.deleteRestaurant(id, function (err, restaurant) {
        if (err) {
            req.status(501).send("unable to delete restaurant");
        }
        else {
            res.status(200).send(restaurant);
        }
    })
});

//////////////////////////////////////////////////////////////////////////--product routes
router.get('/api/product', function (req, res) {
    product.getProduct(function (err, Products) {
        if (err) {
            res.status(500).send("Unable to get all rooms");
        } else {
            res.status(200).send(Products);
        }
    })
});
router.get('/api/product/:restaurant', function (req, res) {
    var restaurant = req.params.restaurant;
    restaurant.getRestaurantName(restaurant, function (err, restaurants) {
        if (err) {
            res.status(500).send("unable to find the room with the entered id");
        }
        else {
            res.status(200).send(restaurants);
        }
    })
});
router.post('/api/add_product', function (req, res) {
    var data = req.body;
    product.addProduct(data.name, data.price, data.restaurant, data.image, data.description, function (err, Product) {
        if (err) {
            res.status(501).send("Unable to add a new room");
        } else {
            res.status(200).send(Product);
        }
    })
});
router.get('/api/findproduct/:id', function (req, res) {
    var id = req.params.id
    product.getProductById(id, function (err, product) {
        if (err) {
            res.status(500).send("unable to find the room with the entered id");
        }
        else {
            res.status(200).send(product);
        }
    })
});
router.put('/api/update_product/:id', function (req, res) {
    var id = req.params.id;
    var data = req.body;
    product.updateProduct(id, data.price, data.image, data.description, function (err, restaurant) {
        if (err) {
            res.status(501).send("unable to update restarant information please try again later");
        }
        else {
            res.status(200).send(restaurant);
        }
    })
});
router.delete('/api/delete_product/:id', function (req, res) {
    var id = req.params.id;
    product.deleteProduct(id, function (err, restaurant) {
        if (err) {
            req.status(501).send("unable to delete restaurant");
        }
        else {
            res.status(200).send(restaurant);
        }
    })
});

///////////////////////////////////////////////////////////////////////////--add to cart / view cart routes
router.get('/add_to_cart/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    product.getProductById(productId, function (err, product) {
        if (err) {
            return res.redirect('/cart');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/cart');
    });
});
router.get('/reduce/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/cart');
});
router.get('/remove/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/cart');
});
router.get('/cart', function (req, res, next) {
    if (!req.session.cart) {
        return res.render(__dirname + "/views/customer/cart", { products: null });
    }
    var cart = new Cart(req.session.cart);
    res.render(__dirname + "/views/customer/cart", { products: cart.generateArray(), totalPrice: cart.totalPrice });
});

////////////////////////////////////////////////////////////////////////////////////////////////--login/logout routes
router.post('/api/login', function (req, res) {
    var data = req.body; // get form data from the HTTP body
    User.login(data.email, data.password, function (err, user) {
        if (err) {
            // if error in server side, we send error 500.
            res.status(500).send("Login unsuccessful due to server error.");
        } else {
            if (user == null) {
                // if the returned user object is null (i.e. cannot login)
                res.status(401).send("Login unsucessful. Please try again later.");
            } else {
                var token = crypto.createHash('md5').update(data.email).digest('hex');
                console.log(token);
                User.updateToken(user._id, token, function (err, user) {
                    res.status(200).json({ 'message': 'Login successful.', 'token': token });
                });
            }

        }
    })
})
router.get("/logout", function (req, res) {
    var token = req.query.token;
    console.log(token);
    if (token == undefined) {
        res.status(401).send("No tokens are provided");
    } else {
        User.checkToken(token, function (err, user) {
            if (err || user == null) {
                res.status(401).send("Invalid token provided");
            } else {
                User.removeToken(user._id, function (err, user) {
                    res.status(200).send("Logout successfully")
                });
            }
        })
    }
})

/////////////////////////////////////////////////////////////////////////////////////////users routes
router.get('/api/get_user_by_token/:token', function (req, res) {
    var token = req.params.token;
    User.getUserbytoken(token, function (err, user) {
        if (err) {
            res.status(500).send("unable to find the room with the entered id");
        }
        else {
            res.status(200).send(user);
        }
    })
});

router.put('/api/update_user/:id', function (req, res) {
    var id = req.params.id;
    var data = req.body;
    User.updateuser(id, data.name, data.password, data.phoneNumber, data.address, function (err, restaurant) {
        if (err) {
            res.status(501).send("unable to update restarant information please try again later");
        }
        else {
            res.status(200).send(restaurant);
        }
    })
});

router.get('/api/users', function (req, res) {
    User.getUser(function (err, users) {
        if (err) {
            res.status(500).send("Unable to get all users");
        } else {
            res.status(200).send(users);
        }
    })

});
router.post('/api/add_users', function (req, res) {
    var data = req.body;
    User.addUser(data.name, data.email, data.phoneNumber, data.password, function (err, users) {
        if (err) {
            res.status(500).send("Unable to add a new user");
        } else {
            res.status(200).send(users);
        }
    })

});

///////////////////////////////////////////////////////////////////////////////////voucher routes
router.get('/api/voucher', function (req, res) {

    voucher.getvoucher(function (err, Restaurants) {
        if (err) {
            res.status(500).send("Unable to get all rooms");
        } else {
            res.status(200).send(Restaurants);
        }
    })
});
router.post('/api/add_voucher/', function (req, res) {
    var data = req.body;
    voucher.addvoucher(data.name, data.value, function (err, Restaurants) {
        if (err) {
            res.status(500).send("Unable to add a new room");
        } else {
            res.status(200).send(Restaurants);
        }
    });
});
router.get('/api/voucher/:id', function (req, res) {
    var id = req.params.id;
    voucher.getvoucherbyid(id, function (err, restaurant) {
        if (err) {
            res.status(500).send("unable to find the room with the entered id");
        }
        else {
            res.status(200).send(restaurant);
        }
    })
});
router.put('/api/update_voucher/:id', function (req, res) {
    var id = req.params.id;
    var data = req.body;
    voucher.updatevoucher(id, data.name, data.value, function (err, restaurant) {
        if (err) {
            res.status(500).send("unable to update restarant information please try again later");
        }
        else {
            res.status(200).send(restaurant);
        }
    })
});
router.delete('/api/delete_voucher/:id', function (req, res) {
    var id = req.params.id;
    var token = req.query.token;
    voucher.deletevoucher(id, function (err, restaurant) {
        if (err) {
            req.status(501).send("unable to delete restaurant");
        }
        else {
            res.status(200).send(restaurant);
        }
    })
});

module.exports = router;