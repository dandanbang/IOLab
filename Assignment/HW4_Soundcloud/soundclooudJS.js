$(document).ready(function() {
//When user clicks on the search button, call the SoundCloud API using the user's search query
    $("#search_it").on('click', function() {
        //When there is a new search, clear the previous search results
        $("#search_results").empty(); 
        var user_input = $('.searchinput').val();
        callAPI(user_input);
        $('.searchinput').val('');
    });


//When user hits "enter" key, also call the SoundCloud API using the user's search query
    $(".searchinput").keypress(function(event) {
      if (event.which ==13) {
        //When there is a new search, clear the previous search results
        $( "#search_results" ).empty();
        event.preventDefault();
        var user_input = $('.searchinput').val();
        callAPI(user_input);
      }

    });

//make the song list in playlist draggable to move up/downwards in the playlist
    $( "#playlist" ).sortable();

    });





// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
  $.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
    {'q': query, // dictionary
    'limit': '200'}, // limit of dictionary

    // PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
    // HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
    function(data) {
      //Store the title, song URL, picURL and display them.
      maxlength = 20;
      for (var i = 0; i < maxlength; i++) {
                if (data[i].artwork_url == null) {
                    image_url = "sthwrong.jpg";
                 } else {
                    image_url = data[i].artwork_url;
                }

                link_song = data[i].permalink_url;

                var songlist = "<li class='single_result'><p>" + data[i].title 
                + "</p><p>"+ data[i].user.username + "</p><img src='"+ image_url 
                +"' alt='" + "'/><br><button class='waves-effect waves-light btn orange accent-4 play' onclick= play_song(this) alt = '"
                +link_song+"' ><i class='material-icons right'>play_circle_filled</i>Play</button><br>\
                <button class='waves-effect waves-light btn orange accent-4 add'><i class='material-icons right'>playlist_add</i> Add</button></li>";

                
                $("#search_results").append(songlist);
            };
        },'json'
  );
}

//when the play button is called, play the song by calling changeTrack
function play_song(button_element) {
    url = $(button_element).attr('alt');
    changeTrack(url);
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


    $(document).on('click', '.add',function(){
    // Add the song list to playlist, and adding "delete" button, removing "add to playlist" button
        $(this).addClass("delete");
        $(this).removeClass("add");
        $(this).html("<i class='material-icons right'>delete</i>delete");

        addthissong = $(this).parent().clone()
        $("#playlist").prepend(addthissong);
        //after the song list copied to playlist
        //add back the "add to playlist" button, while removing "delete" button from the clicked item/added item in the search result, so that it would not be deleted from the search result
        $(this).addClass("add");
        $(this).removeClass("delete"); 
        $(this).html("<i class='material-icons right'>playlist_add</i> Add");
    });


    //when "play" button clicked, remove previous Stratus player, and start the new one
    $(document).on('click', '.play', function() {
        play_url = $(this).attr("play_url");
        if (play_url != null) {
            changeTrack(play_url);
        }
    });

    //when "delete" button clicked, remove the song list from the playlist
    $(document).on('click', '.delete', function() {
        $(this).parent().remove();
        
    });

