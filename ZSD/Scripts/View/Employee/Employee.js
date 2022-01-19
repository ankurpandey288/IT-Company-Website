$(document).ready(function () {
    GetEmployee();
});

function GetEmployee() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: apiurl + 'api/CommonApi/GetEmployee',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tbldemployee')) {
                table = $('#tbldemployee').DataTable();
            } else {
                table = $('#tbldemployee').DataTable();
            }
            table.destroy();
            $("#tbldemployee").DataTable({
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

                    { data: 'Name' },
                    { data: 'Contact_number' },
                    { data: 'Email_id' },
                    { data: 'Designation' }

                ],
            });
        },

        error: function (edata) {
            alert("error while feching record.");
        }
    });
};