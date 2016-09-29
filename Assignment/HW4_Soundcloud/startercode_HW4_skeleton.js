//FFBB97, F69875, FF5701, FDD0C0, FE712F
function callAPI(query) { // Takes in the user's input as argument, 'query', and returns the first 20 search results.
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
		for (i = 0; i < 20; i++) { // First 20 search results
			var art = data[i]['artwork_url']; // artwork url
			if (art == null) {	// Default artwork
				art = 'http://ichef.bbci.co.uk/news/624/cpsprodpb/7402/production/_91389692_ctrdewvumaalgc_.jpg'
			}
			var artwork = "<img src=" + art + " alt='Album Artwork'>";
			var title = data[i]['title'];
			var playURL = data[i]['permalink_url'];
			
			$('#list_results').append("<div class='each-result'><span class='album-art'>" + artwork + "</span><span class='song'>" + title + "</span><button id='playButton' data-url=" + playURL + ">Play</button><button id='addButton'>Add to Playlist</buton></div>");
		}
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
      align: "bottom",
      links: url
    });
}

$(document).ready(  // When user clicks "Go!" button, a task is added a search is started
    $("#search-button").on('click', function() {
        // once the document loads, create new item with this function
        $('#list_results').empty();
        var user_input = $('#search_box').val();
        if (user_input != "") {
            callAPI(user_input);	// calls the search.
         }
    })
);

$("#list_results").on('click', "#addButton", function() { // When user clicks "Add to Playlist" button, task is added to  Playlist.
        var copy = $(this).parent().clone();
        $(copy).children('#addButton').html('Remove');	// Adds 'Remove' button to each song added to the playlist.
     	$(copy).append("<button class='up'>Up</button><button class='down'>Down</button>"); // Adds up and down buttons.
        $("#list_playlist").prepend(copy);
});

$("#list_results").on('click', "#playButton", function() { // When user clicks "Play" button, song will play (from search results).
        var songURL = $(this).attr('data-url');
        changeTrack(songURL);
});

$("#list_playlist").on('click', "#playButton", function() { // When user clicks "Play" button, song will play (from playlist).
        var songURL = $(this).attr('data-url');
        changeTrack(songURL);
});


$("#list_playlist").on('click', "#addButton", function() { // When user clicks "Remove" button, removes from playlist.
        $(this).parent().remove();
});

$("#list_playlist").on('click', ".up", function() { // When user clicks "up" button, song is moved up in playlist.
	$(this).parent().insertBefore($(this).parent().prev());
});

$("#list_playlist").on('click', ".down", function() { // When user clicks "down" button, song is moved down in playlist.
        $(this).parent().insertAfter($(this).parent().next());
});