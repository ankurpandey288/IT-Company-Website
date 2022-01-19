$(document).ready(function () {
    GetAssignwork();
    $("#activity").change(function () {
        GetAssignwork();
    });
});

function GetAssignwork() {
    var parm = {
        "user_id": parseInt(document.getElementById('activity').value)
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: apiurl + 'api/CommonApi/Getassignwork',
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblwrk')) {
                table = $('#tblwrk').DataTable();
            } else {
                table = $('#tblwrk').DataTable();
            }
            table.destroy();
            $("#tblwrk").DataTable({
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
                        data: 'date_task',
                        render: function (task_date) {
                            var temp = moment(task_date).format('DD/MM/YYYY');
                            return temp;
                        }
                    },
                    {
                        data: 'assign_work',
                        render: function (data, type, row) {
                            return data.split(", ").join("<br/>");
                        }
                    },
                    {
                        data: 't_date',
                        render: function (data) {
                            if (data == null) {
                                return 'Not Applicable';
                            } else {
                                var temp = moment(data).format('DD/MM/YYYY');
                                return temp;
                            }
                        }
                    },
                    {
                        data: 'completion_date',
                        render: function (data) {
                            if (data == null) {
                                return 'Not yet completed!';
                            } else {
                                var temp = moment(data).format("DD/MM/YYYY");
                                return temp;
                            }
                        }
                    },
                    {
                        data: 'status',
                        render: function (data, type, row) {
                            let status = 0;
                            let html = '';
                            if (data == 0) {
                                //let taskid = row['id'];
                                html += '<select onchange="changeStatus(this);" data-id="' + row['id'] + '">';
                                if (status < 1) {
                                    html += '<option value="0" selected>Pending</option>';
                                }
                                html += '<option value="1">Completed</option>';
                                html += '</select>';
                                return html;
                            } else {
                                return '<span class="badge badge-soft-success">Completed</span>';
                            }
                        }
                    }
                ],
            });
        },

        error: function (edata) {
            alert("error while feching record.");
        }
    });
};

function changeStatus(elmnt) {
    let status = $(elmnt).val();
    let taskid = $(elmnt).attr('data-id');
    var parm = {
        "id": taskid ,
        "status": status
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: apiurl + 'api/CommonApi/chandstatus',
        success: function (data) {
            swal("Success", data, "success");
        },
        error: function (result) {
            swal("Error", "Some error occured!", "error");
        }
    });
};

function updateCompletionDate(elmnt) {
    let completion_date = $(elmnt).val();
    let taskid = $(elmnt).attr('data-id');
    var parm = {
        "id": taskid,
        "completion_date": completion_date,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: apiurl + 'api/CommonApi/changecompletiondate',
        success: function (data) {
            swal("Success", data, "success");
            $(elmnt).attr('disabled', true)
        },
        error: function (result) {
            swal("Error", "Some error occured!", "error");
        }
    });
}

