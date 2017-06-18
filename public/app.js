$(document).ready(function() {
    // initiate Materialize modal for notes
    $('#note-modal').modal()
    // random color function... for extra rainbow-ness !! Sets border of each item to random color on page load
    $('.item').each(function() {
        var hue = 'rgb(' + (Math.floor((256 - 199) * Math.random()) + 200) + ',' + (Math.floor((256 - 199) * Math.random()) + 200) + ',' + (Math.floor((256 - 199) * Math.random()) + 200) + ')';
        $(this).css({
            "border-color": hue,
            "border-width": "15px",
            "border-style": "solid"
        });
    });

    // The following script is for the new note form in note modal
    var $h2 = $("<h2>").addClass("center-align modal-header")
    $("#new-note").append($h2);
    $("#new-note").append("<input id='author' name='author' placeholder='Your Name' required>");
    $("#new-note").append("<input id='comment' name='comment' placeholder='Your Comment' required></textarea>");
    $("#new-note").append("<button class='btn btn-flat' id='save-note'>Save Note</button>");
});

// User clicks pencil icon to open note modal
$(document).on("click", ".note-modal-btn", function() {
    // clear any previous data to prep for AJAX call
    $("#save-note").removeAttr('data-id');
    $(".modal-header").empty();
    $("#notes").empty();
    // store id of the item user selects
    var thisId = $(this).attr("data-id");
    // Using AJAX to GET notes data for specific item id
    $.ajax({
      method: "GET",
      url: "/favorites/notes/" + thisId
    })
      .done(function(data) {
        // Use retrieved data to display item-specific title in modal
        $(".modal-header").text(data.title);
        // add item id as data attribute to the button for saving new notes
        $("#save-note").attr('data-id', thisId)
        // loop through items.notes to find any existing notes
        for (var i = 0; i < data.notes.length; i++) {
            // and display the existing notes 
            var $note = $("<div>").addClass("note-div");
            var $author = $("<p class='author'>").text(data.notes[i].author + " says:");
            var $comment = $("<p>").text(data.notes[i].comment);
            // the last bit of HTML being appended  below is a delete button for deleting a specific note
            $note.append($author).append($comment).append("<button type='submit' class='delete-btn' note-id='" + data.notes[i]._id + "' data-id='"+ thisId +"'><i class='fa fa-times x-btn' aria-hidden='true'></i></button>");
            $("#notes").append($note);
        };
    });
});

// Click function for save note button
$(document).on("click", "#save-note", function() {
    // close the modal
    $('#note-modal').modal('close');
    var thisId = $(this).attr("data-id");
  // POST route takes form information and sends the new note data to the database
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
    // reset form fields
    $("#author").val("");
    $("#comment").val("");
});
// Click function for delete note buttons
$(document).on("click", ".delete-btn", function() {
    $('#note-modal').modal('close');
    var itemId = $(this).attr("data-id");
    var noteId = $(this).attr("note-id")
     // POST route uses item id and sends back the id of note being deleted to database
    $.ajax({
      method: "POST",
      url: "/favorites/notes/delete/" + itemId,
      data: {
              _id: noteId
            }
      })
      .done(function(data) {
        console.log("ajax ", data);
      });
});
