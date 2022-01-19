$(document).ready(function () {
    setvideos();
    $("#btnSubmit").click(function () {
        if (validatevideo() == true) {
            InsVideoLink();
        }
    });
});
function validatevideo() {
    var return_val = true;
    if ($('#txtHeading').val().trim() == "" || $('#txtHeading').val() == null) {
        $('#SpnHeading').show();
        return_val = false;
    } else {
        $('#SpnHeading').hide();
    }
    if ($('#txtlink').val().trim() == "" || $('#txtlink').val() == null) {
        $('#Spnslink').show();
        return_val = false;
    } else {
        $('#Spnslink').hide();
    }
    return return_val;
};

function InsVideoLink() {
    var parm = {
        "heading": $("#txtHeading").val().trim(),
        "paste_link": $("#txtlink").val().trim()
    }
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: apiurl + 'api/CommonApi/videos',
        success: function (data) {
            $("#closedModel").click();
            swal({
                text: "Video Upload Successfully",
                icon: "success",
                button: "Ok"
            }).then(function () { window.location.href = "/Admin/Mylearning";});
            
        },
        error: function (result) {
            alert("Error : Error data ");
        }
    });   
};

function setvideos() {
    let youtubeurl = 'https://www.youtube.com/embed/';
    $.ajax({
        type: "Get",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: apiurl + 'api/CommonApi/linkupload',
        success: function (data) {
            console.log(data);
            let response = JSON.parse(JSON.stringify(data));
            let html = '';
            $.each(response, function (index, val) {
                html += '<div class="col-lg-4">';
                html += '   <div class="card">';
                html += '       <div class="card-body">';
                html += '           <div class="embed-responsive embed-responsive-16by9" id="videolink">';
                html += '               <iframe class="embed-responsive-item" src=' + youtubeurl+val.paste_link + ' allowfullscreen></iframe>';
                html += '            </div>';
                html += '            <h5>';
                html += '                ' + val.heading + '';
                html += '             </h5>';
                html += '       </div>';
                html += '  </div>';
                html += '</div>';
            });
            $('#lerning-vedios').html(html);
        },
        error: function (result) {
            alert("Error : Error data ");
        }
    });
}
