$(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var token = sessionStorage.authToken;
    restaurantId = urlParams.get('id');
    console.log(restaurantId);
    $.ajax({
        url: 'http://localhost:3000/api/restaurant',
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function (restaurant) {
                    if (restaurant._id == restaurantId) {
                        if(token == "67ea7f9172bbf44d6c86cf37db4390af"){
                            $("#restaurant-grid-img").append(`
                            <img src="/farhad-ibrahimzade-lKk2xzM0YFU-unsplash.jpg" alt="sushi image"
                            id="restaurant-grid-img-content">
                            <div id="restaurant-grid-text-grid">
                                <div class="restaurant-grid-text-grid-content"><strong>Name:</strong> ${restaurant.name}</div>
                                <div class="restaurant-grid-text-grid-content"><strong>Type:</strong> ${restaurant.type}</div>
                                <div class="restaurant-grid-text-grid-content"><strong>Opening Hours:</strong> ${restaurant.open_hours}</div>
                                <div class="restaurant-grid-text-grid-content"><strong>Description:</strong> ${restaurant.description}</div>
                            </div>
                            <br /> <br />
                            <div><a href="/update?id=${restaurant._id}" class="next">Edit Restaurant &raquo;</a></div>
                            <br /> <br />
                            <div><a href="/add_product" class="next">Add Product &raquo;</a></div>
                            `);
                        }else{
                            $("#restaurant-grid-img").append(`
                            <img src="/farhad-ibrahimzade-lKk2xzM0YFU-unsplash.jpg" alt="sushi image"
                            id="restaurant-grid-img-content">
                            <div id="restaurant-grid-text-grid">
                                <div class="restaurant-grid-text-grid-content"><strong>Name:</strong> ${restaurant.name}</div>
                                <div class="restaurant-grid-text-grid-content"><strong>Type:</strong> ${restaurant.type}</div>
                                <div class="restaurant-grid-text-grid-content"><strong>Opening Hours:</strong> ${restaurant.open_hours}</div>
                                <div class="restaurant-grid-text-grid-content"><strong>Description:</strong> ${restaurant.description}</div>
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
