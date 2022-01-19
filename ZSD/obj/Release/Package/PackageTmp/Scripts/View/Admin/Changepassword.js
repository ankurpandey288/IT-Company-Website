$(document).ready(function () {
    $("#btnSubmit").click(function () {
        if (validatePass() == true) {
           InsPassword();
        } 
    });
});
function validatePass() {
    var return_val = true;
    if ($('#txtPsd').val().trim() == "" || $('#txtPsd').val() == null) {
        $('#SpnPsd').show();
        return_val = false;
    } else {
        $('#SpnPsd').hide();
    }
    if ($('#txtCnPsd').val().trim() == "" || $('#txtCnPsd').val() == null) {
        $('#SpnCnPsd').show();
        return_val = false;
    } else {
        $('#SpnCnPsd').hide();
    }
    return return_val;
};

function InsPassword() {
    var parm = {
        "password": $("#txtPsd").val().trim(),
        "id": parseInt(document.getElementById('Admin').value)
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: apiurl + 'api/CommonApi/ChangePassword',
        success: function (data) {
            alert(data.status);
            window.location.href = "/Admin/AdminProfile";
        },
        error: function (result) {
            alert("Error : Error data ");
        }
    });
};