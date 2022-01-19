$(document).ready(function () {
    var id = $.session.get('Blog_Id');
    getblogs(id);

});

function getblogs(id) {
    var base_url = " https://zservicedesk.com/api/";
    var parm = {
        "Id": id
    };
    var josnstr = JSON.stringify(parm);
    var base_url = " https://zservicedesk.com/api/";
    $.ajax({
        type: "Post",
        dataType: "json",
        data:josnstr,
        contentType: "application/json; charset=utf-8",
        url: apiurl + 'api/CommonApi/getblogsbyid',
        success: function (data) {
            $("#heading").text(data.Heading);
            $("#describe").text(data.Describe);
            //  $("#image").img(data.Image_Link);
            var link = base_url + data.Image_Link;
            $("#image").attr("src", link);
        },
        error: function (result) {
            alert("Error : Error data ");
        }
    });
}
