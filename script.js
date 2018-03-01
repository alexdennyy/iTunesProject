var count;

$(document).ready(function(){
    $(".btn").on("click", function(){
        var search = $("#artistSelect").val();
        count = $("#results").val();
        console.log(search + count);
        $.ajax({
            url: "https://itunes.apple.com/search?term=" + search + "&limit=" +  count,
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            success: function(result) {
                myFunction(result);
            },
            error: function() { alert('Failed!'); }
        });
    });
});

function myFunction(json){
    $("#resultTable").empty();
    var html = "<table class='table table-striped' border=1><tr><td></td><td>Track</td><td>Artist</td><td>Album</td><td>Preview</td><td>Price</td></tr>";
    for(var i = 0; i < count; i++){
        var img = json.results[i].artworkUrl60;
        html += "<tr>";
        html += "<td><img src=" + img + "></td>"
        html += "<td>" + json.results[i].trackName + "</td>";
        html += "<td>" +json.results[i].artistName + "</td>";
        html += "<td>" +json.results[i].collectionName + "</td>";
        html += "<td>" + "<audio controls='true' src=' " + json.results[i].previewUrl + " ' id='audio' type='audio/m4a'></audio></td>";
        html += "<td>" + "$" + json.results[i].trackPrice + "</td>";
        html += "</tr>";
    }
    html += "</table>";

    $("#resultTable").append(html);
    console.log(json);
}
