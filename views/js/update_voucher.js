var id = 0;
$(document).ready(function () {
    var urlparam = new URLSearchParams(window.location.search);
    id = urlparam.get('id');
    $.ajax({
        url: 'http://localhost:3000/api/voucher/'+id,
        method: "get",
    })
        .done(function (data) {
            $("#name").val(data.name)
            $("#value").val(data.value)
        })

    $("#update").submit(function (e) {
        e.preventDefault();
        let name = $("#name").val();
        let value = $("#value").val();

        $.ajax({
            url: 'http://localhost:3000/api/update_voucher/'+id,
            dataType: "json",
            method: "put",
            data: {
                name: name,
                value: value,
            },
            success: function (response) {
                alert("Successfully Updated Voucher");
                window.location.replace("/voucher");
            },
            error: function (request, status, error) {
                alert( "You do not have the correct permissions" );
            }
        })
    })

    $("#delete").submit(function (e){
        $.ajax({
            url: 'http://localhost:3000/api/delete_voucher/'+id,
            dataType: "json",
            method: "delete",
            success: function (response) {
                alert("Successfully Deleted Voucher");
                window.location.replace("/voucher");
            },
            error: function (request, status, error) {
                alert( "You do not have the correct permissions" );
            }
        })
    })
})