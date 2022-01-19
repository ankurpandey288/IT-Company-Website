$(document).ready(function () {
    Getdeal();
    $("#btnSubmit").click(function () {
        if (validateDeal() == true) {
            InsNewDeal();
        } else {
            return false;
        }
    });
    $(document).on('click', '.editview', function () {
        if ($.session.get("deal_id") != '' || $.session.get("deal_id") != null || $.session.get("deal_id") == undefined) {
            $.session.remove("deal_id");
            $.session.set("deal_id", $(this).attr('name'));
            window.location.href = '/users/Dealdetails';
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

    if ($('#txtcntname').val().trim() == "" || $('#txtcntname').val() == null) {
        $('#spncntname').show();
        return_val = false;
    } else {
        $('#spncntname').hide();
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
        "Deal_Status": $("#ddlstatus option:selected").val(),
        "Opp_Name": $("#txtoppname").val().trim(),
        "Cust_Name": $("#txtcustomer").val().trim(),
        "Focus_Ind": $("#txtfocus").val().trim(),
        "Address": $("#txtaddress").val().trim(),
        "City": $("#txtcity").val().trim(),
        "Country": $("#ddlcountry option:selected").val(),
        "Cont_Person": $("#txtperson").val().trim(),
        "Cont_Name": $("#txtcntname").val().trim(),
        "Busi_Mail": $("#txtemail").val().trim(),
        "Req_Desc": $("#txtcontent").val().trim(),
        "Depl_Type": $("#ddldeployment option:selected").val(),
        "Num_Tech": $("#txtnumtech").val().trim(),
        "Num_Assets": $("#txtasset").val().trim(),
        "Exp_Close": $("#txtexp").val().trim()
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
                text: "Deal Added Successfully",
                icon: "success",
                button: "Ok"
            }).then((value) => {
                window.location.href = '/Admin/Deal';
            });
        },
        error: function (result) {
            swal({
                text: "Error",
                icon: "Error",
                button: "Ok"
            })
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
                paging: false,
                sort: false,
                searching: false,
                ordering: false,
                order: [],
                lengthMenu: [
                    [10, 25, 50, -1],
                    ['10 rows', '25 rows', '50 rows', 'Show all']
                ],
                responsive: true,
                columns: [
                    //{
                    //    data: 'Deal_Id',
                    //    sWidth: '2px',
                    //    sClass: "view",
                    //    bSortable: true,
                    //    render: function (Deal_Id) {
                    //        return Deal_Id + '&nbsp;<a href="javascript:void(0);"  class="editview" name="' + Deal_Id + '" class="deal"><i class="fa fa-eye user_detail" id="' + Deal_Id + '" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i></a>';
                    //    }
                    //},
                    {
                        data: 'Deal_Id', sWidth: '100px', render: function (Deal_Id, type, row) {
                            return '<a href="javascript:void(0);"  class="editview"  name="' + Deal_Id + '"> <i class="fa fa-eye icon-ser"> </i> ' + row.Deal_Id + + row.Deal_Id + '</a>';

                        }
                    },
                    { data: 'Opp_Name' },
                    { data: 'Cust_Name' },
                    { data: 'City' },
                    {
                        "data": "Uploaded_Date",
                        "type": "date",
                        "render":
                            function (data, type, full) {
                                return (data) ? moment(data).format('DD/MM/YYYY') : '';
                            }
                    },
                    {
                        data: 'Approval_status',
                        render: function (status) {
                            if (status == 0) {
                                return '<span class="badge badge-primary" style="background-color:#ea2d2d  !important;font-size:13px !important" name="Pending">Pending</span>';
                            } else {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#23af73  !important;font-size: 13px !important;" name="Approved">Approved</span>';
                            }
                        }
                    },
                    {
                        "data": "till_date",
                        "type": "date",
                        "render":
                            function (data, type, full) {
                                return (data) ? moment(data).format('DD/MM/YYYY') : '';
                            }
                    },
                ],
            });
        },
        error: function (result) {
            alert("Error : data Register2");
        }
    });
};

