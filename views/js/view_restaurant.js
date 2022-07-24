$(function () {
    $.ajax({
        url: 'http://localhost:3000/api/restaurant',
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function (restaurant) {
                    $("#restaurant-grid").append(`
                    <div id="restaurant-grid-img">
        <img src="/farhad-ibrahimzade-lKk2xzM0YFU-unsplash.jpg" alt="sushi image"
          id="restaurant-grid-img-content">
      </div>
      <div id="restaurant-grid-text-grid">
        <div class="restaurant-grid-text-grid-content"><strong>Name:</strong> ${restaurant.name}</div>
        <div class="restaurant-grid-text-grid-content"><strong>Type:</strong> ${restaurant.type}</div>
        <div class="restaurant-grid-text-grid-content"><strong>Opening Hours:</strong> ${restaurant.open_hours}</div>
        <div class="restaurant-grid-text-grid-content"><strong>Description:</strong> ${restaurant.description}</div>
          <br><br>
        <div><a href="/product?id=${restaurant._id}" class="next">View Restaurant &raquo;</a></div>
      </div>
                    `);
                })
            }
        )
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )
});
