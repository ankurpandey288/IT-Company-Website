
$(document).ready(function () {
    Getdocs();
});

function Getdocs() {
    $.ajax({
        type: "get",
        dataType: "json",
        contentType: "application/json ",
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
                paging: true,
                sort: false,
                searching: false,
                ordering: true,
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
                    { data: 'File_Name' },
                    { data: 'Upload_Date' },
                    { data: 'Descript' },
                    { data: 'Category' },
                    {
                        data: 'Id',
                        sWidth: '3px',
                        render: function (Id) {
                            return '&nbsp; <a class="" href="#" onclick="DeleteUser(' + Id + ')"> <i class="fa fa-trash" data-toggle="tooltip" title="" style="font-size:18px;color:red !important" data-original-title="Normal priority"></i> &nbsp; </a>';
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


function DeleteUser(id) {
    var parm = {
        "Id": id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: apiurl + '/api/Admin/DeleteUser',
        success: function (data) {
            //alert("Inserted Successfully");
            if (data.status_id != 0) {
                //successnotify(data.status);
                alert(data.status);
                GetUserList();

            } else {
                alert(data.status);
                GetUserList();
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};