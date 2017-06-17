$(document).ready(function(){
    $('#fave-alert').modal()
    $('#note-modal').modal()
// random border color function... for extra rainbow-ness
    $('.item').each(function () {
        var hue = 'rgb(' + (Math.floor((256-199)*Math.random()) + 200) + ',' + (Math.floor((256-199)*Math.random()) + 200) + ',' + (Math.floor((256-199)*Math.random()) + 200) + ')';
        $(this).css({
            "border-color": hue,
            "border-width":"15px",
            "border-style":"solid"
        });
    });
});

$(document).on("click", ".note-modal-btn", function() {
    $("new-note").empty();
    var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/favorites/notes/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {

      // The title of the article
      $("#new-note").append("<h2 class='center-align'>" + data.title + "</h2>");
      // An input to enter a new title
      $("#new-note").append("<input id='author' name='author' placeholder='Your Name'>");
      // A textarea to add a new note body
      $("#new-note").append("<textarea id='comment' name='comment' placeholder='Your Comment'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#new-note").append("<button class='btn btn-flat' data-id='" + data._id + "' id='save-note'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
    
        console.log(data.note)
        var $note = $("<div>")
        var $author = $("<p>").text(data.note.author);
        var $comment = $("<p>").text(data.note.comment);
        var formAction = "/favorites/notes/" + thisId + "/delete";
        $note.append($author).append($comment).append("<form action='"+ formAction +"' method='DELETE'>"+
            "<input type='hidden' name='delete' value=''>"+
            "<button type='submit' class='.delete-btn' data-id='"+thisId+"'>"+
            "Delete"+
            "</button></form>");

        $("#notes").append($note);
        
      };
    });
});

// When you click the savenote button
$(document).on("click", "#save-note", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/favorites/notes/" + thisId,
    data: {
      // Value taken from title input
      author: $("#author").val(),
      // Value taken from note textarea
      comment: $("#comment").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);

    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#author").val("");
  $("#comment").val("");
});