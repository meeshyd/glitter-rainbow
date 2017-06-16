$(document).ready(function(){
    $('.fave-alert').modal()
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

$(document).on("click", ".save-fave", function() {

    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/favorites/" + thisId,
        data: {
        // set saved field to true
            saved: true,
        }

    }).done(function(data) {
      alert("Saved to favorites!")

    });
});

// // Whenever someone clicks on list item with class .item
// $(document).on("click", "li.item", function() {
//   // Empty the notes from the note section
//   $("#notes").empty();
//   // Save the data-id from the item
//   var thisId = $(this).attr("data-id");

//   // Now make an ajax call for the item by id
//   $.ajax({
//     method: "GET",
//     url: "/items/" + thisId
//   })
//     // With that done, add the note information to the page
//     .done(function(data) {
//       console.log(data);
//       // The title of the article
//       $("#notes").append("<h2>" + data.title + "</h2>");
//       // An input to enter a new title
//       $("#notes").append("<input id='titleinput' name='title' >");
//       // A textarea to add a new note body
//       $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//       // A button to submit a new note, with the id of the article saved to it
//       $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

//       // If there's a note in the article
//       if (data.note) {
//         // Place the title of the note in the title input
//         $("#titleinput").val(data.note.title);
//         // Place the body of the note in the body textarea
//         $("#bodyinput").val(data.note.body);
//       }
//     });
// });

// // When you click the savenote button
// $(document).on("click", "#savenote", function() {
//   // Grab the id associated with the article from the submit button
//   var thisId = $(this).attr("data-id");

//   // Run a POST request to change the note, using what's entered in the inputs
//   $.ajax({
//     method: "POST",
//     url: "/items/" + thisId,
//     data: {
//       // Value taken from title input
//       title: $("#titleinput").val(),
//       // Value taken from note textarea
//       body: $("#bodyinput").val()
//     }
//   })
//     // With that done
//     .done(function(data) {
//       // Log the response
//       console.log(data);
//       // Empty the notes section
//       $("#notes").empty();
//     });

//   // Also, remove the values entered in the input and textarea for note entry
//   $("#titleinput").val("");
//   $("#bodyinput").val("");
// });