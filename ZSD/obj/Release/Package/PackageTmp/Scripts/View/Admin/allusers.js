//var Chk = null;
$(document).ready(function () {
    Getuser();
  //  UpdateStatus(44, 0);
});
function handleClick(id,cb) {
  //  alert(id);
   // alert(cb);
    if (cb.checked) {
      //  alert(1);
      //  alert(id);
        UpdateStatus(id,1 );
    } else {
        UpdateStatus(id,0 );
      //  alert(2);
      //  alert(id);
    }
}
function Getuser() {
    $.ajax({
        type: "get",
        dataType: "json",
        contentType: "application/json; charset=utf-8 ",
        url: apiurl + "api/CommonApi/GetAlluser",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblalluser')) {
                table = $('#tblalluser').DataTable();
            } else {
                table = $('#tblalluser').DataTable();
            }
            table.destroy();
            $("#tblalluser").DataTable({
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
                    { data: 'id' }, 
                    { data: 'name' },
                    { data: 'Company_Name' },
                    { data: 'Email_ID' },
                    { data: 'Contact_Number' },
                    { data: 'City' },
                    {
                        data: 'id',
                        render: function (id,type,row) {
                            if (row["is_active"] == 1) {
                                return '<div class="custom-control custom-switch switch-success">' +
                                    '<input type="checkbox" class="switch_1" id="customSwitchSuccess' + id + '" name="' + id + '" onclick="handleClick(' + id +',this);" checked>';
                            } else {
                                return '<div class="custom-control custom-switch switch-success">' +
                                    '<input type="checkbox" class="switch_1" id="customSwitchSuccess' + id + '" onclick="handleClick(' + id + ', this);">';
                            }
                        }
                    }
                ],
            });
        },
        error: function (result) {
            alert("Error : data Register2");
        }
    });
};

function UpdateStatus(id, is_status) {
    //alert(id)
   //// alert(is_status)
    var parm = {
        "id": id,
        "is_active": is_status 
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: apiurl + 'api/CommonApi/upduserstatus',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == 1) {
                swal({
                    title: 'Success',
                    text: data.status,
                    icon: "success"
                });
            } else {
                swal({
                    title: 'Warning',
                    text: data.status,
                    icon: "warning"
                });
            }
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};