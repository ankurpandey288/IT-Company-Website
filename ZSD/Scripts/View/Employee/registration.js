$(document).ready(function () {
    $("#btnSubmit").click(function () {
        if (RegisterInLogin() == true) {
        } else {
            return false;
        }
    });
});

//add dataq to user login table
function RegisterInLogin() {
    var parm = {
        "email": $("#email").val(),
        "password": $("#password").val(),
        "created_by": 4,
        "role_id": 4
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: apiurl + "api/CommonApi/Employee",
        success: function (data) {
            if (data.status_id == 1) {
                Insertemployee();
            } else {
                swal("Error", data.status, "error");
            }
        },
        error: function (result) {
            alert("Error : data1");
        }
    });
};

//Add data to user registration table
function Insertemployee() {
    var parm = {
        "Name": $("#name").val(),
        "Contact_number": $("#number").val(),
        "Email_id": $("#email").val(),
        "Designation": $("#Designation").val()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8 ",
        url: apiurl + "api/CommonApi/EmployeeReg",
        success: function (data) {
            if (data.status_id == 1) {
                swal({
                    text: "Registration Successful",
                    icon: "success",
                    button: "Ok"
                }).then((value) => {
                    window.location.href = '/';
                });

            } else {
                swal("Error", data.status, "error");
            }
        },
        error: function (result) {
            alert("Error : data2");
        }
    });
};