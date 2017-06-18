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
      var $h2 = $("<h2>").addClass("center-align modal-header")
          // The title of the article
      $("#new-note").append($h2);
      // An input to enter a new title
      $("#new-note").append("<input id='author' name='author' placeholder='Your Name'>");
      // A textarea to add a new note body
      $("#new-note").append("<input id='comment' name='comment' placeholder='Your Comment'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
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
    // With that done, add the note information to the page
    .done(function(data) {
      $(".modal-header").text(data.title);
      $("#save-note").attr('data-id', thisId)

      for (var i =0; i<data.notes.length; i++){
        console.log(data.notes[i])
        var $note = $("<div>")
        var $author = $("<p>").text(data.notes[i].author);
        var $comment = $("<p>").text(data.notes[i].comment);
        var $delete = $("<button>").html("<button type='submit' class='.delete-btn' data-id='"+thisId+"'>"+"Delete</button>")
        $note.append($author).append($comment).append($delete);
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