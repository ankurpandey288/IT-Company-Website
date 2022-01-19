$(document).ready(function () {
    var id = $.session.get('deal_id');
    GetDealbyid(id);
    $("#btnUpdate").click(function () {
        Updatedeal(id);
    });
});
//Get Task For Edit
function GetDealbyid(id) {
    var parm = {
        'Deal_Id': id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: apiurl + 'api/CommonApi/getdealbyid',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#txtoppname").val(data.Opp_Name);
            $("#txtcustomer").val(data.Cust_Name);
            $("#txtfocus").val(data.Focus_Ind);
            $("#txtaddress").val(data.Address);
            $("#txtcity").val(data.City);
            $("#txtperson").val(data.Cont_Person);
            $("#txtcntname").val(data.Cont_Name);
            $("#txtemail").val(data.Busi_Mail);
            $("#txtnumtech").val(data.Num_Tech);
            $("#txtasset").val(data.Num_Assets);
            $("#txtcontent").val(data.Req_Desc);
            $("#ddlcountry").val(data.Country).change();
            $("#ddldeployment").val(data.Depl_Type).change();
            $("#ddllicense").val(data.Licensing_Subscription).change();
            $("#ddlservices").val(data.Services).change();
            var pd = moment(data.Exp_Close).format('DD-MM-YYYY');
            $("#txtexp").val(pd);
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Update Task
function Updatedeal(id) {
    var parm = {
        "Deal_Id": id,
        "Opp_Name": $("#txtoppname").val().trim(),
        "Cust_Name": $("#txtcustomer").val().trim(),
        "Focus_Ind": $("#txtfocus").val().trim(),
        "Address": $("#txtaddress").val().trim(),
        "City": $("#txtcity").val().trim(),
        "Cont_Person": $("#txtperson").val().trim(),
        "Cont_Name": $("#txtcntname").val().trim(),
        "Busi_Mail": $("#txtemail").val().trim(),
        "Num_Tech": $("#txtnumtech").val().trim(),
        "Num_Assets": $("#txtasset").val().trim(),
        "Req_Desc": $("#txtcontent").val().trim(),
        "Exp_Close": $("#txtexp").val().trim(),
        "Country": $("#ddlcountry option:selected").val(),
        "Depl_Type": $("#ddldeployment option:selected").val(),
        "Services": $("#ddlservices option:selected").val()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: apiurl + 'api/CommonApi/UpdateDealById',
        success: function (data) {
            if (data.status_id == 1) {
                swal({
                    text: "Deal Updated Successful",
                    icon: "success",
                    button: "Ok"
                }).then((value) => {
                    window.location.href = "/Users/Deal";
                });
            } else {
                warningnotify(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};