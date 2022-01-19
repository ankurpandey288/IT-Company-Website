$(document).ready(function () {
    GetUsers();
});

function GetUsers() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: apiurl + '/api/CommonApi/GetUsers',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblduser')) {
                table = $('#tblduser').DataTable();
            } else {
                table = $('#tblduser').DataTable();
            }
            table.destroy();
            $("#tblduser").DataTable({
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
                   
                     { data: 'User_Id'},
                    { data: 'Email_ID' },
                    { data: 'Designation'},
                    { data: 'Contact_Number'},
                    { data: 'Address' },
                    { data: 'City'},
                    { data: 'Country'},
                    { data: 'Approved_by'}
                   
                ],
            });
        },

        error: function (edata) {
            alert("error while feching record.");
        }
    });
};