$(document).ready(function () {
    Getemp();
    $("#ddlemployee").change(function () {
        Getactivity();
    })
    $("#btnSubmit").click(function () {
        if (validateactivity() == true) {
            Insactivity();
        } else {
            return false;
        }
    });
});

function validateactivity() {
    var return_val = true;
    if ($('#txtdate').val().trim() == "" || $('#txtdate').val() == null) {
        $('#Spndate').show();
        return_val = false;
    } else {
        $('#Spndate').hide();
    }
    if ($('#txttask').val().trim() == "" || $('#txttask').val() == null) {
        $('#Spntask').show();
        return_val = false;
    } else {
        $('#Spntask').hide();
    }
    return return_val;
};

function Insactivity() {
    var parm = {
        "date": $("#txtdate").val().trim(),
        "task": $("#txttask").val().trim()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8 ",
        url: apiurl + "api/CommonApi/InsActivity",
        success: function (data) {
            if (data.status_id == 1) {
                alert(data.status);
            } else {
                alert(data.status);
            }
        },
        error: function (result) {
            alert("Error : data Register2");
        }
    });
}

function Getactivity() {
    var parm = {
        "user_id": parseInt($("#ddlemployee option:selected").val())
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: apiurl + 'api/CommonApi/GetActivity',
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblactivity')) {
                table = $('#tblactivity').DataTable();
            } else {
                table = $('#tblactivity').DataTable();
            }
            table.destroy();
            $("#tblactivity").DataTable({
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
                        data: 'task_date',
                        render: function (task_date) {
                            var temp = moment(task_date).format('DD/MM/YYYY');
                            return temp;
                        }
                    },
                    { data: 'task' }

                ],
            });
        },

        error: function (edata) {
            alert("error while feching record.");
        }
    });
};

function Getemp() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: apiurl + 'api/CommonApi/Getempfortaskdetails',
        dataType: "json",
        success: function (data) {
            $("#ddlemployee").html("").append('<option value="0" >Select Employee</option>');
            $(data).each(function () {
                $("#ddlemployee").append('<option value=' + this.Login_Id + ' >' + this.Name+'</option>');
            })
        },

        error: function (edata) {
            alert("error while feching record.");
        }
    });
}