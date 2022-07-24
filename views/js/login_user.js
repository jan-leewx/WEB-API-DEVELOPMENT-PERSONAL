$(function () {
    var token = sessionStorage.authToken;

    // if token is not found, show only unprotected section 
    if (token == undefined) {
        if (window.location.href !== "http://localhost:3000/account") {
            window.location.replace("http://localhost:3000/account");
        }

    } else {  // show the protected section
        if (window.location.href !== "http://localhost:3000/adminview") {
            window.location.replace("http://localhost:3000/adminview");
        }
    }
    $(".logoutBtn").click(function(){
        $.ajax({
            url: "/logout?token="+sessionStorage.authToken,
            method:"get"
        })
        .done(function(data){
            sessionStorage.removeItem("authToken");
            location.reload();
        })
        .fail(function(err){
            console.log(err.responseText);
        })
    });    
});
function login() {  // This function is to be put OUTSIDE the $(document).ready() codes
    var credentials = {
        // get values from the username and password textboxes
        email: $("#email").val(),
        password: $("#password").val()
    }
    $.ajax({  // we make a connection to our login web API to perform a login request
        url: "/api/login",
        method: "post",
        data: credentials
    })
        .done(function (data) {
            sessionStorage.authToken = data.token;
            window.location.replace("/adminview");
        })
        .fail(function (err) {
            $(".statusMessage").text(err.responseText);
        })
    return false;
}    