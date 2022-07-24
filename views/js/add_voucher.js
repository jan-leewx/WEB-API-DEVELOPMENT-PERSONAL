$(document).ready(function() {
    $("#adding").submit(function(e) {
        e.preventDefault();
        let name = $("#name").val();
        let value = $("#value").val();

        $.ajax({
            url: 'http://localhost:3000/api/add_voucher',
            dataType: "json",
            method: "post",
            data: {
                name: name,
                value: value,
            },
            success: function (response) {
                alert("Successfully Added Voucher");
                window.location.replace("/voucher");
            },
            error: function (request, status, error) {
                alert( error );
            }
        })
    })
});