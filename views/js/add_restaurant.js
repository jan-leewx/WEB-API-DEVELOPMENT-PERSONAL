$(document).ready(function () {
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
    $("#adding").submit(function (e) {
        e.preventDefault();
        let name = $("#name").val();
        let type = $("#type option:selected").text();
        let img_path = $("#image").val();
        let description = $("#description").val()
        let open_hours = $("#open_hours").val()

        $.ajax({
            url: 'http://localhost:3000/api/add_restaurant',
            dataType: "json",
            method: "post",
            data: {
                name: name,
                type: type,
                img_path: img_path,
                description: description,
                open_hours: open_hours
            },
            success: function (response) {
                alert("Successfully added Resturant");
                window.location.replace("/view");
            },
            error: function (request, status, error) {
                alert( "You do not have the correct permissions" );
            }
        })
    })
});