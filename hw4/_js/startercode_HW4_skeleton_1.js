$( document ).ready(function() {
    // Event hander for calling the SoundCloud API using the user's search query
    //search = $('#input').val();

    $("#input").keypress(function(event) {
        // Submit the new item when user pressing the "enter" key
        if (event.which == 13) {
            event.preventDefault();
            search = $('#input').val();
            callAPI(search);
            // submitNewItem();
        }
    });

    $("#new-button").on('click', function(){
        // Submit the new item when user click on the "add" button
        search = $('#input').val();
        callAPI(search);
        // submitNewItem();
    });

    $( "#list_completed" ).sortable();



});

    function callAPI(query) {
    	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
    		{'q': query,
    		'limit': '200'},
    		function(data) {
                // search_display(data)
    			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
    			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
                search_display(data);
            },'json'
    	);
    }


    function search_display(data) {
        // newValue = $('.new-input').val();
        display_list = "<li class='collection-item avatar'>\
                            <img class='img_thumbnail circle' src='url'>\
                            <span class='width-txt'><p class='title'>music_title</p>\
                            <p>artist</p></span>\
                            <i class='material-icons play icon-float-right' play_url='play_link'>play_circle_filled</i>\
                            <i class='material-icons playlist icon-float-right-2'>playlist_add</i>\
                        </li>"

        for (var i=0; i < 20; i++){
            display_list_ = display_list
            album_photo_url = data[i].artwork_url;
            play_url = data[i].permalink_url;
            music_title =  data[i].title;
            artist = data[i].user.username;
            if (album_photo_url == null)
                album_photo_url = "images/placeholder.png"
            display_list_ = display_list_.replace("url", album_photo_url);
            display_list_ = display_list_.replace('music_title', music_title)
            display_list_ = display_list_.replace('artist', artist)
            display_list_ = display_list_.replace('play_link', play_url)
            $('#list_todo').append(display_list_)

        };


        //
        // $(".delete-icon").on('click', function(){
        //     console.log("remove is ready!")
        //     // $(this).remove();
        //
        // });
        //
        // $( "#list_completed" ).sortable();

    };



    $(document).on('click', '.playlist',function(){
    // // Move from to-do to completed
        $(this).addClass("delete-icon");
        $(this).removeClass("playlist");
        $(this).html("delete");
        playlist_ = $(this).parent().clone()
        $("#list_completed").prepend(playlist_);
        $(this).removeClass("delete-icon");
        $(this).addClass("playlist");
        $(this).html("playlist_add");
    });



    $(document).on('click', '.play', function() {
        // play_url = $(this).attr("play_url");
        play_url = $(this).attr("play_url");
        if (play_url != null) {
            changeTrack(play_url);
        }
    });

    $(document).on('click', '.delete-icon', function() {
        $(this).parent().remove();
        
    });


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
    };
