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

// // When you click the savenote button
// $(document).on("click", ".delete-btn", function() {
//   // Grab the id associated with the article from the submit button
//   var thisId = $(this).attr("data-id");

//   // Run a POST request to change the note, using what's entered in the inputs
//   $.ajax({
//     method: "DELETE",
//     url: "/favorites/notes/" + thisId,
//   })
//     // With that done
//     .done(function(data) {
//       // Log the response
//       console.log(data);
//     });
// });

$(document).on("click", ".note-modal-btn", function() {

  $("#notes").empty();

  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/favorites/notes/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);
      console.log(data.title)
      console.log("HEY!")
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='author' name='author'>");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='comment' name='comment'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='save-note'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        console.log("HEY AGAIN!")
        console.log(data.note.author)
        // Place the title of the note in the title input
        $("#author").val(data.note.author);
        // Place the body of the note in the body textarea
        $("#comment").val(data.note.comment);
      }
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
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#author").val("");
  $("#comment").val("");
});