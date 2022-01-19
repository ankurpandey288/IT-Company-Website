$(document).ready(function () {
    Getdocs();
    $("#btnSubmit").click(function () {
        if (validateDocs() == true) {
            InsMarket();
        } else {
            return false;
        }
    });
});
function validateDocs() {
    var return_val = true;
    if ($('#txtCategory').val().trim() == "" || $('#txtCategory').val() == null) {
        $('#SpnCategory').show();
        return_val = false;
    } else {
        $('#SpnCategory').hide();
    }
    if ($('#txtDescript').val().trim() == "" || $('#txtDescript').val() == null) {
        $('#SpnDescript').show();
        return_val = false;
    } else {
        $('#SpnDescript').hide();
    }
    if ($('#txtuplaod').val().trim() == "" || $('#txtuplaod').val() == null) {
        $('#Spnuplaod').show();
        return_val = false;
    } else {
        $('#Spnuplaod').hide();
    }
    return return_val;
};

function InsMarket() {
    var fname = document.getElementById('txtuplaod').value;
    fname = fname.split("\\").pop();
    var parm = {
        "File_Name": $("#txtfilename").val().trim(),
        "Descript": $("#txtDescript").val().trim(),
        "Category": $("#txtCategory").val().trim(),
        "File_Path": fname
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8 ",
        url: apiurl + "api/CommonApi/InsMarket",
        success: function (data) {
            if (data.status_id == 1) {
                uploadDoc();
                swal({
                    title: "Document Added Succesfully",
                    icon: "success",
                    button: "Ok"
                }).then((value) => {
                    window.location.href = '/PartnerPortal/ViewDocs';
                });
            } else {
                alert(data.status);
            }
        },
        error: function (result) {
            alert("Error : data Register2");
        }
    });
}

function Getdocs() {
    $.ajax({
        type: "get",
        dataType: "json",
        contentType: "application/json; charset=utf-8 ",
        url: apiurl + "api/CommonApi/GetDocs",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tbldocs')) {
                table = $('#tbldocs').DataTable();
            } else {
                table = $('#tbldocs').DataTable();
            }
            table.destroy();
            $("#tbldocs").DataTable({
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
                    {
                        data: 'Id',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: true,
                        render: function (Id) {
                            return Id + '&nbsp;<a href="/Admin/UserDetails" name="' + Id + '" class="deal"></a>';
                        }
                    },
                    {
                        data: 'File_Path',
                        render: function (File_Path) {
                            return '<a href="' + apiurl + '/MarketingDocs/' + File_Path + '" target="_blank" download=true>' + File_Path + '</a>'
                        }
                    },
                    { data: 'File_Name' },
                    { data: 'Category' },
                    { data: 'Descript' },
                    {
                        "data": "Upload_Date",
                        "type": "date",
                        "render":
                            function (data, type, full) {
                                return (data) ? moment(data).format('DD/MM/YYYY') : '';
                            }
                    },
                ],
                // dom: 'Bfrtip',
                //dom: 'Bflrtip',
                //buttons: [
                //    {
                //        extend: 'copyHtml5',
                //        text: '<i class="far fa-file fa-1x"></i>',
                //        titleAttr: 'Copy'
                //    },
                //    {
                //        extend: 'excelHtml5',
                //        text: '<i class="far fa-file-excel fa-1x" style="color:green"></i>',
                //        titleAttr: 'Excel'
                //    },
                //    {
                //        extend: 'pdfHtml5',
                //        text: '<i class="far fa-file-pdf fa-1x" style="color:red"></i>',
                //        titleAttr: 'PDF'
                //    }
                //]
            });
        },
        error: function (result) {
            alert("Error : data Register2");
        }
    });
};

function uploadDoc() {
    var fileUpload = $("#txtuplaod").get(0);
    var _file = fileUpload.files;
    var _data = new FormData();
    _data.append('file[1]', _file[0]);
    $.ajax({
        url: '/PartnerPortal/uploadFile',
        type: 'post',
        datatype: 'json',
        contentType: false,
        processData: false,
        async: false,
        data: _data,
        success: function (response) {
            swal({
                title: "Document Added Succesfully",
                icon: "success",
                button: "Ok"
            }).then((value) => {
                window.location.href = '/PartnerPortal/ViewDocs';
            });
        },
        error: function (result) {
            swal("Error", result, "error");
        }
    });
};
