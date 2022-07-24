var restaurant = 0;
$(document).ready(function () {
    var urlparam = new URLSearchParams(window.location.search);
    restaurant = urlparam.get('restaurant');
    $.ajax({
        url: 'http://localhost:3000/api/product/' + restaurant,
        method: "get"
    })
        .done(function (data) {
            $("#addProduct").append(`
    <a href="addProduct?restaurant=${restaurant}">add product
    </a>
    `)
            data.forEach(function (product) {
                $("#product").append(`
            <tr>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${product.image}</td>
            <td>${product.description}</td>
            <td><a href="/updateProduct?id=${product._id}">update</td>
            </tr>
            `
                )
            })

        })
})