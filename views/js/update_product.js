var id = 0;
$(document).ready(function (){
    var urlparam = new URLSearchParams(window.location.search);
    id = urlparam.get('id');
    $.ajax({
        url: 'http://localhost:3000/api/findproduct/'+id,
        method: "get"
    })
        .done(function (data) {
            $("#name").val(data.name)
            $("#price").val(data.price)
            $("#description").val(data.description)
            $("#image").val(data.image)
        })

        $("#update_product").submit(function (e){
            e.preventDefault();
            let price = $("#price").val();
            let description = $("#description").val();
            let image = $("#image").val()

            $.ajax({
                url: 'http://localhost:3000/api/update_product/'+id,
                dataType: "json",
                method: "put",
                data: {
                    price: price,
                    description: description,
                    image: image
                },
                success: function (response) {
                    alert("Successfully added Product");
                    window.location.replace("/product");
                },
                error: function (request, status, error) {
                    alert( "You do not have the correct permissions" );
                }
            })
        })

        $("#delete").submit(function (e){
            $.ajax({
                url: 'http://localhost:3000/api/delete_product/'+id,
                dataType: "json",
                method: "delete",
                success: function (response) {
                    alert("Successfully Deleted Product");
                    window.location.replace("/product");
                },
                error: function (request, status, error) {
                    alert( "You do not have the correct permissions" );
                }
            })
        })


})