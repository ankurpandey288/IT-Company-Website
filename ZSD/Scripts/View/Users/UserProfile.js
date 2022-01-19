$(document).ready(function () {
    Getuserprofile();
    getblogs();
    $(document).on('click', '.editview', function () {
        if ($.session.get("Blog_Id") != '' || $.session.get("Blog_Id") != null || $.session.get("Blog_Id") == undefined) {
            $.session.remove("Blog_Id");
            $.session.set("Blog_Id", $(this).attr("name"));
            window.location.href = '/Admin/ViewProfile';
        }
    });
});

function Getuserprofile() {
    var parm = {
        "id": parseInt($("#admin").val())
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        dataType: "json",
        data: josnstr,
        contentType: "application/json; charset=utf-8",
        url: apiurl + 'api/CommonApi/Getuserprofile',
        success: function (data) {
            $('#username').append(data.name);
            $('#companyname').append(data.company);
        },
        error: function (result) {
            alert("Some error ocurred!");
        }
    });
};
function getblogs() {
    var base_url = " https://zservicedesk.com/api/";
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

