$(document).ready(function () {
    GetCompany();
    $("#btnSubmit").click(function () {
        if (validatesignup() == true) {
            RegisterInLogin();
            Insertuser();
        } else {
            return false;
        }
    });
});

function validatesignup() {
    var return_val = true;
    if ($('#ddlcompany option:selected').val() == 0) {
        $('#Spncompany').show();
        return_val = false;
    } else {
        $('#SpnCompany').hide();
    }
    if ($('#txtname').val().trim() == "" || $('#txtname').val() == null) {
        $('#Spnname').show();
        return_val = false;
    } else {
        $('#Spnname').hide();
    }
    if ($('#txtphone').val().trim() == "" || $('#txtphone').val() == null) {
        $('#Spnphone').show();
        return_val = false;
    } else {
        $('#Spnphone').hide();
    }
    if ($('#txtemail').val().trim() == "" || $('#txtemail').val() == null) {
        $('#Spnemail').show();
        return_val = false;
    } else {
        $('#Spnemail').hide();
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
    if ($('#txtpass').val().trim() == "" || $('#txtpass').val() == null) {
        $('#Spnpass').html('<li class="parsley-required">This value is required.</li>');
        $('#Spnpass').show();
        return_val = false;
    } else {
        $('#Spnpass').hide();
    }
    if ($('#ddlcountry option:selected').val() == 0) {
        $('#Spncountry').show();
        return_val = false;
    } else {
        $('#Spncountry').hide();
    }
    if ($('#txtDesignation').val().trim() == "" || $('#txtDesignation').val() == null) {
        $('#SpnDesignation').show();
        return_val = false;
    } else {
        $('#SpnDesignation').hide();
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
    return return_val;
};

//add dataq to user login table
function RegisterInLogin() {
    var parm = {
        "email": $("#txtemail").val(),
        "password": $("#txtpass").val(),
        "created_by": 3,
        "role_id": 3
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json",
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
            alert("Error : Error data ");
        }
    });
};

//Add data to user registration table
function Insertuser() {
    var parm = {
        "Company_Id": parseInt($("#ddlcompany option:selected").val()),
        "name": $("#txtname").val(),
        "Designation": $("#txtDesignation").val(),
        "Contact_Number": $("#txtphone").val(),
        "Address": $("#txtaddress").val(),
        "City": $("#txtcity").val(),
        "Country": ($("#ddlcountry option:selected").val()),
        "Email_ID": $("#txtemail").val(),
        "Created_By": parseInt("3")
    };

    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8 ",
        url: apiurl + "api/CommonApi/AddUserToRegTbl",
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
            alert("Error : data2");
        }
    });
};

function GetCompany() {
    $.ajax({
        type: "Get",
        dataType: "json",
        contentType: "application/json; charset=utf-8;",
        url: apiurl + "api/CommonApi/GetCompany",
        success: function (data) {
            $("#ddlcompany").html("").append('<option value="0">Select Company</option>');
            $(data).each(function () {
                $("#ddlcompany").append('<option value=' + this.Company_Id + '>' + this.Company_Name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data ddl ");
        }
    });
};