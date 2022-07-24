var session_token = 0;
$(document).ready(async function (e) {
    var urlparam = new URLSearchParams(window.location.search);
    session_token = urlparam.get('token');
    await $.ajax({
        url: 'http://localhost:3000/api/get_user_by_token/' + session_token,
        method: "get"
    })
        .done(function (user) {
            $("#name").val(user.name)
            $("#password").val(user.password)
            $("#address").val(user.address)
            $("#number").val(user.phoneNumber)
            $("#id").val(user._id)
        })

    $("#update_user").submit(function (e) {
        e.preventDefault();
        let name = $("#name").val();
        let password = $("#password").val();
        let phoneNumber = $("#number").val();
        let Address = $("#address").val();
        let id = $("#id").val();

        $.ajax({
            url: 'http://localhost:3000/api/update_user/'+id,
            dataType: "json",
            method: "put",
            data: {
                name: name,
                password: password,
                phoneNumber: phoneNumber,
                address: Address,
            },
            success: function (response) {
                alert("Successfully Updated User Details");
                window.location.replace("/adminview");
            },
        })
    })
})