$(document).ready(function() {
    //Let's start out with a demo list of songs.
    callAPI('trance', 20, function (data) {
        displaySongs(data);
    });

    //Song search function.
    $("#search_submit").click(function() {
        var song_query = $("#search_field").val();

        //Update song list.
        if (song_query) {
            callAPI(song_query, 20, function (data) {
                displaySongs(data);
            });
        }
    });


    //displaySongs(): update song results list.
    function displaySongs(data) {
        $(".song_entry_container .song_entry").remove();

        if (data.length) {
            for(var si=0; si<data.length; si++) {
                var song_id = data[si]["id"];
                var song_title = data[si]["title"];
                var song_permalink = data[si]["permalink_url"];
                var song_duration = data[si]["duration"];
                var song_pic = data[si]["artwork_url"];

                if (! song_pic) {
                    song_pic = "assets/img_not_found.png";
                }

                //Create song entry.
                var song_entry = '<div class="song_entry" data-song-id="' + song_id + '">' +
                                    '<img class="song_pic" src="' + song_pic + '">' +
                                    '<div class="song_title">' + song_title +'</div>' +
                                    '<div class="song_actions">' +
                                        '<button class="button song_play" data-play-url="' + song_permalink + '">play</button>' +
                                        '<button class="button song_add_to_playlist">+playlist</button>' +
                                        '<div class="play_list_navi">' +
                                            '<button class="button navi_up">Up</button>' +
                                            '<button class="button navi_down">Down</button>' +
                                        '</div>' +
                                    '</div>' +
                                 '</div>';

                //Now add it to the list.
                $(".song_entry_container").append(song_entry);
            }

           updateButtons();
        }
    }


    //updateButtons(): attach button events
    function updateButtons() {
        //"play" button.
        $(".song_entry_container .song_play").off("click").on("click", function(evt) {
            var permalink_url = $(this).attr("data-play-url");
            changeTrack(permalink_url);
        });     


        //"+playlist" (add to playlist) button.
        $(".song_entry_container .song_add_to_playlist").off("click").on("click", function() {
            var song_entry = $(this).parent().parent().clone();    //Go up 2 levels to reach our song_entry div & clone it.

            //Find the 2 buttons inside the element we're moving to playlist.
            var play_list_button = song_entry.find(".song_add_to_playlist");
            var play_button = song_entry.find(".song_play");

            //Change function of the playlist button to removal from playlist.
            play_list_button.html("-playlist");                             //Change label to "playlist-".
            play_list_button.off("click").on("click", function() {
                $(this).parent().parent().remove();                         //We're removing it from the list.
            });

            //Play the song within playlist.
            play_button.off("click").on("click", function(evt) {
                var permalink_url = $(this).attr("data-play-url");
                changeTrack(permalink_url);
            });

            //Show navigation (up / down) buttons for the song in the playlist.
            song_entry.find(".play_list_navi").css("display", "block");

            //Song move up action.
            song_entry.find(".play_list_navi .navi_up").on("click", function() {
                var pl_song_entry = $(this).parent().parent().parent();
                pl_song_entry.insertBefore(pl_song_entry.prev());
            });

            //Song move down action.
            song_entry.find(".play_list_navi .navi_down").on("click", function() {
                var pl_song_entry = $(this).parent().parent().parent();
                pl_song_entry.insertAfter(pl_song_entry.next());
            });

            song_entry.prependTo($(".play_list_container"));                    //Add to the playlist.
        });
    }


    //*** Player routines.

    // Event handler for calling the SoundCloud API using the user's search query
    function callAPI(query, query_limit, callback) {
        $.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
            {   'q': query,
                'limit': query_limit },
            function(data) {
                // PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
                // HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
                callback(data);
            },'json'
        );
    }

    // 'Play' button event handler - play the track in the Stratus player
    function changeTrack(url) {
        // Remove any existing instances of the Stratus player
        $('#stratus').remove();

        // Create a new Stratus player using the clicked song's permalink URL
        $.stratus({
            key: "b3179c0738764e846066975c2571aebb",
            auto_play: true,
            download: false,
            align: "bottom",
            links: url
        });
    }

});