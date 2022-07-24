$(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var token = sessionStorage.authToken;
    restaurantId = urlParams.get('id');
    console.log(restaurantId);
    $.ajax({
        url: 'http://localhost:3000/api/product',
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function (product) {
                    if (product.restaurant == restaurantId) {
                        console.log(product.restaurant)
                        if(token == "67ea7f9172bbf44d6c86cf37db4390af"){
                            $("#view-resturant-section-product-grid").append(`
                            <div id="view-resturant-section-product-grid-items">
                            <div id="product-grid-img">
                                <img src="/farhad-ibrahimzade-lKk2xzM0YFU-unsplash.jpg" alt="sushi image"
                                    id="product-grid-img-content">
                            </div>
                            <div id="product-grid-text-grid">
                                <div class="product-grid-text-grid-content"><strong>Name:</strong> ${product.name}
                                </div>
                                <div class="product-grid-text-grid-content"><strong>Price:</strong> ${product.price}</div>
                                <div class="product-grid-text-grid-content"><strong>Description:</strong> ${product.description}</div>
                                
                                <br /><br />
                                <div><a href="/product?id=${product._id}" class="next">Edit Products&raquo;</a></div>
                            </div>
                            <div id="product-grid-button">
                                <a href="/add_to_cart/${product._id}" class="next">Add to Cart &raquo;</a>
                            </div>
                        </div>
                            `);
                        }else{
                            $("#view-resturant-section-product-grid").append(`
                            <div id="view-resturant-section-product-grid-items">
                            <div id="product-grid-img">
                                <img src="/farhad-ibrahimzade-lKk2xzM0YFU-unsplash.jpg" alt="sushi image"
                                    id="product-grid-img-content">
                            </div>
                            <div id="product-grid-text-grid">
                                <div class="product-grid-text-grid-content"><strong>Name:</strong> ${product.name}
                                </div>
                                <div class="product-grid-text-grid-content"><strong>Price:</strong> ${product.price}</div>
                                <div class="product-grid-text-grid-content"><strong>Description:</strong> ${product.description}</div>
                            </div>
                            <div id="product-grid-button">
                                <a href="/add_to_cart/${product._id}" class="next">Add to Cart &raquo;</a>
                            </div>
                        </div>
                            `);
                        }
                        
                    }
                })
            }
        )
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )
});
