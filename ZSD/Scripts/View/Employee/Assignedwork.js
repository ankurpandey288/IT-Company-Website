$(document).ready(function () {
    Getemp();
    GetAssignwork();
    Getempdrop();
    $("#btnSubmit").click(function () {
        if (validateassignwork() == true) {
            Insassignwork();
        } else {
            return false;
        }
    });
    $("#ddlwork").change(function () {
        GetAssignwork();
    });
});
function myFunction() {
    var checkBox = document.getElementById("check");
    var text = document.getElementById("target");
    if (checkBox.checked == false) {
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
}

function validateassignwork() {
    var return_val = true;
    if ($('#ddlemployee option:selected').val() == 0) {
        $('#Spnemployee').show();
        return_val = false;
    } else {
        $('#Spnemployee').hide();
    }
    if ($('#txttask').val() == "" || $('#txttask').val() == null) {
        $('#Spntask').show();
        return_val = false;
    } else {
        $('#Spntask').hide();
    }
      return return_val;
};

function Insassignwork() {
    var val1 = document.getElementById('check'); 
    var dat_val,chk;
    if (val1.checked) {
        dat_val = null;
        chk = 1;
        $.session.set("date", "No deadline");
    } else {
        dat_val = document.getElementById('target').value;
        chk = 0;
        $.session.set("date", dat_val);
    }
    $.session.set("task", $("#txttask").val());
    var parm = {
        "user_id": parseInt($("#ddlemployee option:selected").val()),
        "assign_work": $("#txttask").val(),
        "t_date": dat_val,
        "deadline": chk
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8 ",
        url: apiurl + "api/CommonApi/InsAssignwork",
        success: function (data) {
            if (data.status_id == 1) {
                $("#closedModel").click();
                //swal("Success", data.status, "success");
                GetDetails(parseInt($("#ddlemployee option:selected").val()));
            } else {
                swal("Information",data.status,"info");
            }
        },
        error: function (result) {
            swal("Error", "Error : data Register2", "error");
        }
    });
}

function GetAssignwork() {
    var parm = {
        "user_id": document.getElementById('ddlwork').value
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: apiurl + 'api/CommonApi/GetAssignWork',
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblwork')) {
                table = $('#tblwork').DataTable();
            } else {
                table = $('#tblwork').DataTable();
            }
            table.destroy();
            $("#tblwork").DataTable({
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
                        render: function (status) {
                            if (status == 0) {
                                return '<span class="badge badge-soft-danger">Pending</span>';
                            } else {
                                return '<span class="badge badge-soft-success">Completed</span>';
                            }
                        }
                    },
                   {
                       data: 'id', sWidth: '200px', render: function (id, type, row) {
                           return '<a class="" href="#" onclick="Deletework(' + id + ')"> <span class="badge badge-danger">Cancel</span></a>';
                           //return '<a class="" href="#" onclick="Deletework(' + id + ')"> <i class="fa fa-trash" data-toggle="tooltip" title="" style="font-size:17px;color:red !important" data-original-title="Normal priority"></i> &nbsp; </a>';

                        }
                    },
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
        url: apiurl + 'api/CommonApi/GetEmployee',
        dataType: "json",
        success: function (data) {
            $("#ddlemployee").html("").append('<option value="0" >Select Employee</option>');
            $(data).each(function () {
                $("#ddlemployee").append('<option value=' + this.Login_Id + ' >' + this.Name + '</option>');
            });
        },

        error: function (edata) {
            alert("error while feching record.");
        }
    });
}

function Getempdrop() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: apiurl + 'api/CommonApi/GetEmployee',
        dataType: "json",
        success: function (data) {
            $("#ddlwork").html("").append('<option value="0" >All Employee</option>');
            $(data).each(function () {
                $("#ddlwork").append('<option value=' + this.Login_Id + ' >' + this.Name + '</option>');
            })
        },

        error: function (edata) {
            alert("error while feching record.");
        }
    });
}

function GetDetails(id) {
    var parm = {
        "Login_Id": parseInt(id)
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8 ",
        url: apiurl + "api/CommonApi/Userbyid",
        success: function (data) {
            $.session.set("email_name", data.Name);
            $.session.set("email_email_id", data.Email_id);
            SendMail();
        },
        error: function (result) {
            swal("Error", "Error fetching employee details for email!", "error")
        }
    });
}

function SendMail() {
    var parm = {
        "Name": $.session.get("email_name"),
        "email": $.session.get("email_email_id"),
        "assign_work": $.session.get("task"),
        "t_date": $.session.get("date")
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json;",
        url: "/Employeeadmin/Email",
        success: function (data) {
            swal("Success",data,"success");
        },
        error: function (result) {
            swal("Error","Error sending mail!","error");
        }
    });
};



function Deletework(id) {
    var parm = {
        "id": id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: apiurl + 'api/CommonApi/Deletework',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                swal("Success",data.status,"success");
                GetAssignwork();
            } else {
                swal("Information", data.status, "info");
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};

