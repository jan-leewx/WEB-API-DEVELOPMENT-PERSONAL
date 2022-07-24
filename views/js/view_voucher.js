$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:3000/api/voucher',
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function(voucher) {
                    $("#voucher").append(`
                    <tr>
                    <td>${voucher.name}</td>
                    <td>${voucher.value}</td>
                    <td><a href="/updateVoucher?id=${voucher._id}">update</td>
                </tr>
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