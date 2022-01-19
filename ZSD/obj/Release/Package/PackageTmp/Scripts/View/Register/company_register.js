$(document).ready(function () {
    $("#btnSubmit").click(function () {
        if (validateCompany() == true) {
            RegisterInLogin();
            InsertCompany();
        } else {
            return false;
        }
    });
});
function validateCompany() {
    var return_val = true;
    if ($('#txtname').val() == "" || $('#txtname').val() == null) {
        $('#Spnname').show();
        return_val = false;
    } else {
        $('#Spnname').hide();
    }
    if ($('#txtEstd').val().trim() == "" || $('#txtEstd').val() == null) {
        $('#SpnEstd').show();
        return_val = false;
    } else {
        $('#SpnEstd').hide();
    }
    if ($('#txtcontactname').val().trim() == "" || $('#txtcontactname').val() == null) {
        $('#Spncontactname').show();
        return_val = false;
    } else {
        $('#Spncontactname').hide();
    }
    if ($('#txtEmail').val().trim() == "" || $('#txtEmail').val() == null) {
        $('#SpnEmail').show();
        return_val = false;
    } else {
        $('#SpnEmail').hide();
    }
    if ($('#txtphone').val().trim() == "" || $('#txtphone').val() == null) {
        $('#Spnphone').show();
        return_val = false;
    } else {
        $('#Spnphone').hide();
    }
    if ($('#txtaddress').val().trim() == "" || $('#txtaddress').val() == null) {
        $('#Spnaddress').show();
        return_val = false;
    } else {
        $('#Spnaddress').hide();
    }
    if ($('#txtcity').val().trim() == "" || $('#txtcity').val() == null) {
        $('#Spncity').show();
        return_val = false;
    } else {
        $('#Spncity').hide();
    }
    if ($('#ddlcountry option:selected').val() == 0) {
        $('#Spncountry').show();
        return_val = false;
    } else {
        $('#Spncountry').hide();
    }
    if ($('#ddlEmp option:selected').val() == 0) {
        $('#SpnEmp').show();
        return_val = false;
    } else {
        $('#SpnEmp').hide();
    }
    if ($('#ddlturn option:selected').val() == 0) {
        $('#Spnturn').show();
        return_val = false;
    } else {
        $('#Spnturn').hide();
    }
    if ($('#txtpass').val().trim() == "" || $('#txtpass').val() == null) {
        $('#Spnpass').html('<li class="parsley-required">This value is required.</li>');
        $('#Spnpass').show();
        return_val = false;
    } else {
        $('#Spnpass').hide();
    }
    if ($('#txtpass').val().trim() != $('#txtConfirmPassword').val().trim()) {
        $('#Spnpass').html('<li class="parsley-required">Password does not match.</li>');
        $('#SpnConfirmPassword').html('<li class="parsley-required">Password does not match.</li>');
        $('#Spnpass').show();
        $('#SpnConfirmPassword').show();
        return_val = false;
    } else {
        $('#Spnpass').hide();
        $('#SpnConfirmPassword').hide();
    }
    if ($('#txtcomment').val().trim() == "" || $('#txtcomment').val() == null) {
        $('#Spncomment').show();
        return_val = false;
    } else {
        $('#Spncomment').hide();
    }
    return return_val;
};

//add dataq to user login table
function RegisterInLogin() {
    var parm = {
        "email": $("#txtEmail").val(),
        "password": $("#txtpass").val(),
        "created_by": 2,
        "role_id": 2
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: apiurl + "api/CommonApi/AddUserToLoginTbl",
        success: function (data) {
            if (data.status_id == 1) {
                swal({
                    title: "Thank You",
                    text: "We have successfully received your request for partner registration. You will shortly receive the status updates on your registered Email",
                    icon: "success"
                }).then((value) => {
                    window.location.href = '/PartnerPortal/Login';
                });
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
function InsertCompany() {
    var cn = $("#txtname").val();
    var cm = $("#txtEmail").val();
    var parm = {
        "Email_Id": $("#txtEmail").val(),
        "Contact_Name": $("#txtcontactname").val(),
        "Contact_Number": $("#txtphone").val(),
        "Company_Name": $("#txtname").val(),
        "Establishmennt": parseInt($("#txtEstd").val()),
        "No_Of_Employees": ($("#ddlEmp option:selected").val()),
        "Address": $("#txtaddress").val(),
        "City": $("#txtcity").val(),
        "Country_name": ($("#ddlcountry option:selected").val()),
        "Desc_Bussiness": $("#txtcomment").val(),
        "Turn_over": $("#ddlturn option:selected").val()

    };

    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8 ",
        url: apiurl + "api/CommonApi/AddNewCompany",
        success: function (data) {
            if (data.status_id == 1) {
                swal({
                    title: "Thank You",
                    text: "We have successfully received your request for partner registration. You will shortly receive the status updates on your registered Email",
                    icon: "success"
                }).then((value) => {
                    window.location.href = '/PartnerPortal/Login';
                });
            }
            else {
                swal("Error", data.status, "error");
            }
        },
        error: function (result) {
            alert("Error : data2");
        }
    });
};
