$(document).ready(function() {
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
    $("#new-note").append("<input id='author' name='author' placeholder='Your Name' required>");
    $("#new-note").append("<input id='comment' name='comment' placeholder='Your Comment' required></textarea>");
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
            var $note = $("<div>").addClass("note-div");
            var $author = $("<p class='author'>").text(data.notes[i].author + " says:");
            var $comment = $("<p>").text(data.notes[i].comment);
            $note.append($author).append($comment).append("<button type='submit' class='delete-btn' note-id='" + data.notes[i]._id + "' data-id='"+ thisId +"'><i class='fa fa-times x-btn' aria-hidden='true'></i></button>");
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
            },
        })
        .done(function(data) {
            console.log(data);
        });

    $("#author").val("");
    $("#comment").val("");
});

$(document).on("click", ".delete-btn", function() {

    var itemId = $(this).attr("data-id");
    var noteId = $(this).attr("note-id")

    $.ajax({
            method: "POST",
            url: "/favorites/notes/delete/" + itemId,
            data: {noteId}
        })
        .done(function(data) {
            console.log(data);
            $(this).parent().empty()
        });
});
