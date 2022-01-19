$(document).ready(function () {
    getblogs();

    $("#btnSubmit").click(function () {
        if (validateBlog() == true) {
            InsBlog();
        } else {
            return false;
        }
    });
    $(document).on('click', '.editview', function () {
        if ($.session.get("Blog_Id") != '' || $.session.get("Blog_Id") != null || $.session.get("Blog_Id") == undefined) {
            $.session.remove("Blog_Id");
            $.session.set("Blog_Id", $(this).attr("name"));
            window.location.href = '/Admin/ViewProfile';
        }
    });
});

function validateBlog() {
    var return_val = true;
    if ($('#txtHeading').val() == "" || $('#txtHeading').val() == null) {
        $('#SpnHeading').show();
        return_val = false;
    } else {
        $('#SpnHeading').hide();
    }
    if ($('#txtimage').val().trim() == "" || $('#txtimage').val() == null) {
        $('#Spnsimage').show();
        return_val = false;
    } else {
        $('#Spnsimage').hide();
    }
    return return_val;
};

$(document).ready(function () {
    $('#myform').on('submit', (function (e) {
        e.preventDefault();
        var formData = new FormData(this);
        $.ajax({
            type: 'POST',
            url: apiurl + "api/CommonApi/InsBlog",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log("success");
                console.log(data);
            },
            error: function (data) {
                console.log("error");
                console.log(data);
            }
        });
    }));
});

function InsBlog() {
    var parm = {
        "Heading": $("#txtHeading").val(),
        "Describe": $("#elm1").val(),
        "Image_Link": '/DocFolder/GatePass/IDS/' + $("#txtimage").val().trim().replace(/C:\\fakepath\\/i, ''),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8 ",
        url: apiurl + "api/CommonApi/InsBlog",
        success: function (data) {
            if (data.status_id == 1) {
                swal({
                    text: "Blog Uploded Successful",
                    icon: "success",
                    button: "Ok"
                }).then((value) => {
                    window.location.href = '/Admin/AdminProfile';
                });
                UploadDocument(data._id); 

            } else {
                swal("Error", data.status, "error");
            }
        },
        error: function (result) {
            alert("Error : data2");
        }
    });
};

function UploadDocument(ID) {
    var data = new FormData();
    data.append("UniqueID", ID);
    data.append("DocFolderPath", 'GatePass');
    data.append("Category", $("#txtDesc").val());

    var FileName = '';
    var files = $("#txtimage").get(0).files;
    if (files.length > 0) {
        data.append("UploadedFile", files[0]);
        FileName = $("#txtimage").val().trim().replace(/C:\\fakepath\\/i, '');
        //data.append("FileName", FileName);
        UploadOrgFiles(data);
    }
}

function UploadOrgFiles(data) {
    var ajaxRequest = $.ajax({
        async: false,
        type: "Post",
        url: apiurl + "/api/Commonapi/UploadOrgFile",
        contentType: false,
        processData: false,
        data: data
    });

    ajaxRequest.done(function (xhr, textStatus) {
        // Do other operation
    });
}
function getblogs() {
    var base_url = "https://zservicedesk.com/api/";
    $.ajax({
        type: "Get",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: apiurl + 'api/CommonApi/GetBlog',
        success: function (data) {
            let response = JSON.parse(JSON.stringify(data));
            let html = '';
            $.each(response, function (index, val) {
                html += ' <div class="col-lg-4">';
                html += '    <div class="card">';
                html += '     <div class="card-body">';
                html += '         <div class="blog-card">';
                html += '            <img src=' + base_url + val.Image_Link + ' id="Blogs" class="img-fluid" />';
                html += '             <a href="javascript:void(0);"class="editview" name="' + val.Id + '"><h4 class="my-3">';
                html += '                ' + val.Heading + '';
                html += '              </h4></a>';
                html += '          </div>';
                html += '       </div>';
                html += '   </div>';
                html += ' </div>';
            });
            $('#Blogs').html(html);
        },
        error: function (result) {
            alert("Error : Error data ");
        }
    });
}



