$(document).ready(function() {
    console.log("Ready!");
    $("#newsearch").on('click', function() { 
        // create and add new list of 20
        var inputValue = $("input").val();
        callAPI(inputValue);
        $("input")[0].value = "";
    });

$("#search_results").on('click', '#addtolist', function() {
        // move from search_results container to playlist container
        var playlist_item = $(this).parent().clone();
        playlist_item.find('#addtolist').remove()
        playlist_item.prepend("<button id = 'down'>DOWN</button><button id='up'>UP</button><button id='remove'>Remove</button>");
        $("#mylist").prepend(playlist_item);
    });
});

$(document).on("click", "#play", function(){
    // Play using provide function
    console.log("Playing")
    var song_url = $(this).attr('data-url')
    changeTrack(song_url);
});

$(document).on("click", "#remove", function(){
    // Removes the song from playlist
    console.log("Removing");
    $(this).parent().remove()
    
});

$(document).on("click", "#up", function(){
    // Move it up 
    console.log("Moving up");
    var up_item = $(this).parent()
    up_item.insertBefore(up_item.prev());
});

$(document).on("click", "#down", function(){
    // Move it down 
    console.log("Moving down");
    var down_item = $(this).parent()
    down_item.insertAfter(down_item.next());
});

// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
    /*Go to the webpage, gets a query*/
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'/*max results*/},
		function(data) {
			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
            for (var i = 0; i < 20; i++) {
                var title = data[i].title
                var picture = data[i].artwork_url;
                var playurl = data[i].permalink_url;
                $("#searchlist").append('<li><button id = "addtolist"> Add to playlist </button><button id = "play" data-url = "'+playurl+'"> Play </button>' +title+"<img id='song_pic' src='"+picture +"' alt='no picture available'/>"+'</li>');
            };

		},'json' /*metadata of the search, make it display title (ex. data[i].title), treat image as object*/
	);
}

// 'Play' button event handler - play the track in the Stratus player (already finished but need to include stratus in html)
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


