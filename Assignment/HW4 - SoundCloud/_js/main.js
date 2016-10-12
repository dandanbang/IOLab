$(document).ready(
   $("#btnNewItem").on('click', function() {
       // once the document loads, create new item with this function
     var user_input = $('#txtToDoItem').val();
     callAPI(user_input)

   $('#txtToDoItem').val('');
   })
);

$("#list_todo").on('click', "#btnMoveMe", function() {
       // move from list_search container to list_on_the_go container
       $(this).parent().clone().insertAfter($(this).parent());
       $(this).html("Remove");
       var completedItem = $(this).parent();
       // console.log($(this).paren)
       $("#ul_complete").prepend(completedItem);
       $(completedItem).fadeIn(30000);
});

$("#list_completed").on('click', "#btnMoveMe", function() {
       // move back from list_completed container to list_todo container
       $(this).parent().remove();
});

$("#list_todo").on('click', "#btnDown", function() {
       var next_track = $(this).parent().next();
       $(this).parent().insertAfter(next_track);
});

$("#list_todo").on('click', "#btnUp", function() {
       var prev_track = $(this).parent().prev();
       $(this).parent().insertBefore(prev_track);
});

$("#list_completed").on('click', "#btnDown", function() {
       var next_track = $(this).parent().next();
       $(this).parent().insertAfter(next_track);
});

$("#list_completed").on('click', "#btnUp", function() {
       var prev_track = $(this).parent().prev();
       $(this).parent().insertBefore(prev_track);
});

$("#list_todo").on('click', "#btnPlay", function() {
       var url = $(this).val();
       changeTrack(url);
});

$("#list_completed").on('click', "#btnPlay", function() {
       // move back from list_completed container to list_todo container
       var url = $(this).val();
       changeTrack(url);
});

// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
  $.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
    {'q': query,
    'limit': '200'},
    function(data, status) {
      // PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
      // HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE

      display_tracks(data)
      $('#ul_todo').animate({
                    scrollTop: $("#div").offset().top
                }, 20);

      // console.log($(data)[0])
      // for (var i=0; i < $(data).length; ++i)
      // {
      //     // var arr = $(data)[i].title.split('-');
      //     // $('#ul_todo').append('<div class="row"><button> Move me </button>'+arr[0] +
      //     //   '<p id="introText">' + arr[1] + '</p> <img class="album" src="'+ $(data)[i].artwork_url +'"></>');
      //     $('#ul_todo').append('<div class="row" id="track"> <img class="col-md-4" src="'+ $(data)[i].artwork_url + '"><p class="col-md-8">' + $(data)[i].title + 
      //       '<button> Move me </button> </p> </div>');
      // }
    },'json'
  );
}

function display_tracks(data) {
  for (var i=0; i < $(data).length; ++i)
  {
      var arr = $(data)[i].title.split('-');
      // $('#ul_todo').append('<div class="row">'+$(data)[i].title +'<img class="album" src="'+ $(data)[i].artwork_url +'"><button> Move me </button></>');
      $('#ul_todo').append('<div class="row">' + '<img class="col-md-4" src="'+ $(data)[i].artwork_url +'"><p class="col-md-8">' + $(data)[i].title + 
        '</p class="row"><button id="btnMoveMe" class="col-md-3"> Add to On the Go </button> <button id="btnPlay" class="col-md-3" value="' + $(data)[i].permalink_url + 
        '"> Play </button> <button id="btnUp" class="col-md-3"> Up </button> <button id="btnDown" class="col-md-3"> Down </button></>');

      // $('#ul_todo').append('<div class="row" id="track"> <img class="col-md-4" src="'+ $(data)[i].artwork_url + '"><p class="col-md-8">' + $(data)[i].title + 
      //   '<button> Move me </button> </p> </div>');
  }
}


// 'Play' button event handler - play the track in the Stratus player
function changeTrack(url) {
  // Remove any existing instances of the Stratus player
  $('#stratus').remove();

  // Create a new Stratus player using the clicked song's permalink URL
  $.stratus({
      key: "b3179c0738764e846066975c2571aebb",
      auto_play: true,
      align: "bottom",
      links: url
    });
}

// Sortable list TO-DO
// $( function() {          
//     $( "#ul_todo" ).sortable();
//     $( "#ul_todo" ).disableSelection();
// } );
// Sortable list COMPLETE 
// $( function() {
//     $( "#ul_complete" ).sortable();
//     $( "#ul_complete" ).disableSelection();
// } );