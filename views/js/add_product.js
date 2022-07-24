var restaurant = 0;
$(document).ready(function () {
    var urlparam = new URLSearchParams(window.location.search);
    restaurant = urlparam.get('restaurant');
    $("#addProduct").submit(function (e) {
        e.preventDefault();
        let name = $("#name").val();
        let price = $("#price").val();
        let image = $("#image").val();
        let description = $("#description").val();

        $.ajax({
            url: 'http://localhost:3000/api/add_product',
            dataType: "json",
            method: "post",
            data: {
                name: name,
                price: price,
                image: image,
                restaurant: restaurant,
                description: description
            },
            success: function(response){
                alert("succesfully added product");
                window.location.replace("/");
            },
            error: function (request, status, error) {
                alert( "You do not have the correct permissions" );
            }
        })
    })
})