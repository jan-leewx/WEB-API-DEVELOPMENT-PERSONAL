var id = 0;
$(document).ready(function () {
    var urlparam = new URLSearchParams(window.location.search);
    id = urlparam.get('id');
    $.ajax({
        url: 'http://localhost:3000/api/restaurant',
        method: "get"
    })
        .done(function (data) {
            data.forEach(restaurant => {
                $("#type").append(`
                    <option>${restaurant.type}</option>
                    `);
            })
        }
        )
    $.ajax({
        url: 'http://localhost:3000/api/restaurant/' + id,
        method: "get",
    })
        .done(function (data) {
            $("#name").val(data.name)
            $("#type").val(data.type)
            $("#image").val(data.img_path)
            $("#description").val(data.description)
            $("#open_hours").val(data.open_hours)
        })

    $("#update").submit(function (e) {
        e.preventDefault();
        let name = $("#name").val();
        let type = $("#type").val();
        let img_path = $("#image").val();
        let description = $("#description").val();
        let open_hours = $("#open_hours").val();

        $.ajax({
            url: 'http://localhost:3000/api/update_restaurant/' + id,
            dataType: "json",
            method: "put",
            data: {
                name: name,
                type: type,
                img_path: img_path,
                description: description,
                open_hours: open_hours
            },
            success: function (response) {
                alert("Successfully Updated Resturant");
                window.location.replace("/view");
            },
            error: function (request, status, error) {
                alert( "You do not have the correct permissions" );
            }
        })      
    })

    $("#delete").submit(function (e) {
        $.ajax({
            url: 'http://localhost:3000/api/delete_restaurant/' + id,
            dataType: "json",
            method: "delete",

            success: function (response) {
                alert("Successfully Deleted Resturant");
                window.location.replace("/view");
            },
            error: function (request, status, error) {
                alert( "You do not have the correct permissions" );
            }
        })
    })
})