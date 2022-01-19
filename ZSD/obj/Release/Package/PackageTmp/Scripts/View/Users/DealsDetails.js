$(document).ready(function () {
    var id = $.session.get('deal_id');
    GetDealbyid(id);
});
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



