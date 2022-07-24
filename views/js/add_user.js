$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:3000/api/users',
        method: "get"
    })
    $("#sign-up").submit(function(e) {
        e.preventDefault();
        let name = $("#name").val();
        let email = $("#emailup").val();
        let phoneNum = $("#phoneNum").val();
        let password = $("#passwordup").val()

        $.ajax({
            url: 'http://localhost:3000/api/add_users',
            dataType: "json",
            method: "post",
            data: {
                name:name,
                email:email,
                phoneNumber:phoneNum,
                password: password,
                address: null
            },
            success: function(response) {
                alert("Successfully added User");
                window.location.replace("/");
            }
        })
    })
});