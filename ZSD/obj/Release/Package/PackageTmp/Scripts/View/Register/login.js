$(document).ready(function () {
    $("#btnLogin").click(function () {
        var rtn_val = validatelogin();
        if (rtn_val == true) {
            // Login();
        } else {
            return false;
        }
    });
});
function validatelogin() {
    var return_val = true;
    if ($("#emailaddress").val().trim() == "") {
        return_val = false;
        $("#SpnEmail").show();
    } else {
        $("#SpnEmail").hide();
    }
    if ($("#password").val().trim() == "") {
        return_val = false;
        $("#SpnPassword").show();
    } else {
        $("#SpnPassword").hide();
    }
    return return_val;
}
function Login() {
    var param = {
        "email": $("#txtUserName").val().trim(),
        "password": $("#txtpassword").val().trim()
    }
    var jsondata = JSON.stringify(param);
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: apiurl + 'api/CommonApi/Login',
        data: jsondata,
        dataType: "json",
        success: function (data) {
            debugger;
            var Id = data.id;
            //alert(data.emp_id_pk);
            //if (data.emp_id_pk != 0) {
            //    window.location.href = '/User/EmployeeMaster';
            //}
        },
        error: function (data) {
            alert("Error");
        }
    });
}