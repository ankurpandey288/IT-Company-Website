$(document).ready(function () {
    Getdeal();
    $("#btnSubmit").click(function () {
        if (validateDeal() == true) {
            InsNewDeal();
        } else {
            return false;
        }
    });
    $(document).on('click', '.editView', function () {
        if ($.session.get("deal_id") != '' || $.session.get("deal_id") != null || $.session.get("deal_id") == undefined) {
            $.session.remove("deal_id");
            $.session.set("deal_id", $(this).attr('name'));
        }
    });
});

function validateDeal() {
    var return_val = true;
    if ($('#ddlstatus option:selected').val() == 0) {
        $('#Spnstatus').show();
        return_val = false;
    } else {
        $('#Spnstatus').hide();

    } if ($('#txtoppname').val() == "" || $('#txtoppname').val() == null) {
        $('#Spnoppname').show();
        return_val = false;
    } else {
        $('#Spnoppname').hide();
    }
    if ($('#txtcustomer').val().trim() == "" || $('#txtcustomer').val() == null) {
        $('#spncustomer').show();
        return_val = false;
    } else {
        $('#spncustomer').hide();
    }
    if ($('#txtfocus').val().trim() == "" || $('#txtfocus').val() == null) {
        $('#spnfocus').show();
        return_val = false;
    } else {
        $('#spnfocus').hide();
    }
    if ($('#txtaddress').val().trim() == "" || $('#txtaddress').val() == null) {
        $('#spnaddress').show();
        return_val = false;
    } else {
        $('#spnaddress').hide();
    }
    if ($('#txtcity').val().trim() == "" || $('#txtcity').val() == null) {
        $('#spncity').show();
        return_val = false;
    } else {
        $('#spncity').hide();
    }
    if ($('#ddlcountry option:selected').val() == 0) {
        $('#spncountry').show();
        return_val = false;
    } else {
        $('#spncountry').hide();
    }
    if ($('#txtperson').val().trim() == "" || $('#txtperson').val() == null) {
        $('#spnperson').show();
        return_val = false;
    } else {
        $('#spnperson').hide();
    }
    if ($('#txtcntname').val().trim() == "" || $('#txtcntname').val() == null) {
        $('#spncntname').show();
        return_val = false;
    } else {
        $('#spncntname').hide();
    }
    if ($('#txtemail').val().trim() == "" || $('#txtemail').val() == null) {
        $('#spnemail').show();
        return_val = false;
    } else {
        $('#spnemail').hide();
    }
    if ($('#ddldeployment option:selected').val() == 0) {
        $('#spndeployment').show();
        return_val = false;
    } else {
        $('#spndeployment').hide();
    }
    if ($('#txtnumtech').val().trim() == "" || $('#txtnumtech').val() == null) {
        $('#spnnumtech').show();
        return_val = false;
    } else {
        $('#spnnumtech').hide();
    }
    if ($('#txtcontent').val().trim() == "" || $('#txtcontent').val() == null) {
        $('#spncontent').show();
        return_val = false;
    } else {
        $('#spncontent').hide();
    }
    if ($('#txtasset').val().trim() == "" || $('#txtasset').val() == null) {
        $('#spnasset').show();
        return_val = false;
    } else {
        $('#spnasset').hide();
    }
    if ($('#txtexp').val().trim() == "" || $('#txtexp').val() == null) {
        $('#spnexp').show();
        return_val = false;
    } else {
        $('#spnexp').hide();
    }
    return return_val;
};

function InsNewDeal() {
    var parm = {
        "Login_Id": $("#login_id").val().trim(),
        "Opp_Name": $("#txtoppname").val().trim(),
        "Cust_Name": $("#txtcustomer").val().trim(),
        "Focus_Ind": $("#txtfocus").val().trim(),
        "Address": $("#txtaddress").val().trim(),
        "City": $("#txtcity").val().trim(),
        "Country": $("#ddlcountry option:selected").val().trim(),
        "Cont_Person": $("#txtperson").val().trim(),
        "Cont_Name": $("#txtcntname").val().trim(),
        "Busi_Mail": $("#txtemail").val().trim(),
        "Req_Desc": $("#txtcontent").val().trim(),
        "Depl_Type": $("#ddldeployment option:selected").val().trim(),
        "Num_Tech": $("#txtnumtech").val().trim(),
        "Num_Assets": $("#txtasset").val().trim(),
        "Exp_Close": $("#txtexp").val().trim(),
        "Services": $("#ddlservices option:selected").val()

    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: apiurl + 'api/CommonApi/InsDeal',
        success: function (data) {
            swal({
                text: "Activity Register Successful",
                icon: "success",
                button: "Ok"
            })
            window.location.href = "/Users/Deal";
        },
        error: function (result) {
            alert("Error : Error data ");
        }
    });
};

function Getdeal() {
    $.ajax({
        type: "get",
        dataType: "json",
        contentType: "application/json; charset=utf-8 ",
        url: apiurl + "api/CommonApi/GetDeals",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tbldeal')) {
                table = $('#tbldeal').DataTable();
            } else {
                table = $('#tbldeal').DataTable();
            }
            table.destroy();
            $("#tbldeal").DataTable({
                data: data,
                paging: true,
                sort: false,
                searching: true,
                ordering: true,
                order: [],
                lengthMenu: [
                    [10, 25, 50, -1],
                    ['10 rows', '25 rows', '50 rows', 'Show all']
                ],
                responsive: true,
                columns: [
                    {
                        data: 'Deal_Id',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: true,
                        render: function (Deal_Id) {
                            return Deal_Id + '&nbsp;<a href="javascript:void(0);" name="' + Deal_Id + '" class="deal"><i class="fa fa-eye user_detail" id="' + Deal_Id + '" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i></a>';
                        }
                    },
                    { data: 'Opp_Name' },
                    { data: 'Cust_Name' },
                    { data: 'City' },
                    { data: 'Deal_Status' },
                    {
                        data: 'Approval_status',
                        render: function (Approval_status) {
                            if (Approval_status == 1) {
                                return '<span class="badge badge-soft-success">Approved</span>';
                            } else {
                                return '<span class="badge badge-soft-danger">Rejected</span>';
                            }
                        }
                    }
                ],
                // dom: 'Bfrtip',
                dom: 'Bflrtip',
                buttons: [
                    {
                        extend: 'copyHtml5',
                        text: '<i class="far fa-file fa-1x"></i>',
                        titleAttr: 'Copy'
                    },
                    {
                        extend: 'excelHtml5',
                        text: '<i class="far fa-file-excel fa-1x" style="color:green"></i>',
                        titleAttr: 'Excel'
                    },
                    {
                        extend: 'pdfHtml5',
                        text: '<i class="far fa-file-pdf fa-1x" style="color:red"></i>',
                        titleAttr: 'PDF'
                    }
                ]
                //buttons: [
                //    'copyHtml5',
                //    'excelHtml5',
                //    'csvHtml5',
                //    'pdfHtml5'
                //]
            });
        },
        error: function (result) {
            alert("Error : data Register2");
        }
    });
};