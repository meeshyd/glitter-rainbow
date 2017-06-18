$(document).ready(function() {
    $('#fave-alert').modal()
    $('#note-modal').modal()
        // random border color function... for extra rainbow-ness
    $('.item').each(function() {
        var hue = 'rgb(' + (Math.floor((256 - 199) * Math.random()) + 200) + ',' + (Math.floor((256 - 199) * Math.random()) + 200) + ',' + (Math.floor((256 - 199) * Math.random()) + 200) + ')';
        $(this).css({
            "border-color": hue,
            "border-width": "15px",
            "border-style": "solid"
        });
    });
    var $h2 = $("<h2>").addClass("center-align modal-header")

    $("#new-note").append($h2);
    $("#new-note").append("<input id='author' name='author' placeholder='Your Name'>");
    $("#new-note").append("<input id='comment' name='comment' placeholder='Your Comment'></textarea>");
    $("#new-note").append("<button class='btn btn-flat' id='save-note'>Save Note</button>");
});

$(document).on("click", ".note-modal-btn", function() {
    $("#save-note").removeAttr('data-id');
    $(".modal-header").empty();
    $("#notes").empty();

    var thisId = $(this).attr("data-id");

    $.ajax({
            method: "GET",
            url: "/favorites/notes/" + thisId
        })
        .done(function(data) {
            $(".modal-header").text(data.title);
            $("#save-note").attr('data-id', thisId)

            for (var i = 0; i < data.notes.length; i++) {
                console.log(data.notes[i])
                var $note = $("<div>")
                var $author = $("<p>").text(data.notes[i].author);
                var $comment = $("<p>").text(data.notes[i].comment);
                var $delete = $("<button>").html("<button type='submit' class='.delete-btn' data-id='" + thisId + "'>" + "Delete</button>")
                $note.append($author).append($comment).append($delete);
                $("#notes").append($note);

            };
        });
});


$(document).on("click", "#save-note", function() {

    var thisId = $(this).attr("data-id");

    $.ajax({
            method: "POST",
            url: "/favorites/notes/" + thisId,
            data: {

                author: $("#author").val(),

                comment: $("#comment").val()
            }
        })
        .done(function(data) {
            console.log(data);

        });

    $("#author").val("");
    $("#comment").val("");
});
