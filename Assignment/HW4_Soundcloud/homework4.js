//When user clicks on the search button, send an API call to get the search result
$(document).ready(
    $("#search_it").on('click', function() {
        var user_input = $('#user_search').val();
        callAPI(user_input);
        //alert(user_input);
        $('#user_search').val('');
    })
);

// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
  $.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
    {'q': query, // dictionary
    'limit': '200'}, // limit of dictionary

    // PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
    // HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
    function(data) {
      //Store the title, song URL, picURL and display them.
      for (i = 0; i < 20; i++) {
                if (data[i].artwork_url == null) {
                    image_url = "error.jpg";
                 } else {
                    image_url = data[i].artwork_url;
                }

                //var link_song = data[i].permalink_url;
                var div = "<div id='one_song'><p>" + data[i].title 
                + "</p><p>"+ data[i].user.username + "</p><img src='"+ image_url 
                +"' alt='" + "'/><br><button class='play' onclick= play_song(this) alt = '"
                +data[i].permalink_url+"' >Play</button><br><button class='add'>Add to Playlist</button></div>";
          //console.log(div);
                
                $("#search_results").append(div);
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

