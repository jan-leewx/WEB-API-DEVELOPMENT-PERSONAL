$(function () {
    var token = sessionStorage.authToken;

    // if token is not found, show only unprotected section 
    if (token == "67ea7f9172bbf44d6c86cf37db4390af") {
        $("#admin-grid").append(`
            <section class="admin-grid-contents">
            <img src="../store.png" alt="store image"
            class="admin-grid-contents-img" href="#">
            <h1 class="admin-grid-contents-text"><a href="/add_restaurant">Add Resturant</a></h1>
            </section>
            <section class="admin-grid-contents">
            <img src="../coupon.png" alt="cupon image"
            class="admin-grid-contents-img" href="#">
            <h1 class="admin-grid-contents-text"><a href="/addVoucher">Add Voucher</a></h1>
            </section>
            <section class="admin-grid-contents">
            <img src="../user.png" alt="user image"
            class="admin-grid-contents-img" href="#">
            <h1 class="admin-grid-contents-text"><a href="/update_user?token=${token}">Edit User</a></h1>
            </section>
        `)
    } else { 
        $("#customer-grid").append(`
            <section class="admin-grid-contents">
            <img src="../user.png" alt="user image"
            class="admin-grid-contents-img" href="#">
            <h1 class="admin-grid-contents-text"><a href="/update_user?token=${token}">Edit User</a></h1>
            </section>
            <section class="admin-grid-contents">
            <img src="../coupon.png" alt="cupon image"
            class="admin-grid-contents-img" href="#">
            <h1 class="admin-grid-contents-text"><a href="/Voucher">View Cupons</a></h1>
            </section>
            <section class="admin-grid-contents">
            <img src="../shopping-cart.png" alt="cupon image"
            class="admin-grid-contents-img" href="#">
            <h1 class="admin-grid-contents-text"><a href="/cart">View Cart</a></h1>
            </section>
        `)
    }

});