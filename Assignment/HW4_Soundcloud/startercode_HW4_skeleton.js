// # Issues: add a same song to the playlist
// 		  add to playlist will change the order of original list


// Event hander for calling the SoundCloud API using the user's search query
$(document).ready(function(e) {
	$('#search_button').click(function() {
		text = $("input")[0].value; //Get input value
		// Check input length without space
		if ( $.trim(text).length == 0) {
			alert("You must enter some text");
			return;
		}
		callAPI(text);
		$("input")[0].value = "";
	})

});

$(document).on("click", "#play", function(){
	song_url = $(this.parentNode).children('a').attr('href');
	changeTrack(song_url);
});


$(document).on("click", "#addlist", function(){
	$("#play_list .lists ul").prepend($(this.parentNode));
	// $("#play_list .lists #addlist").text("Up");

	$('#search_results').prepend($(this.parentNode).clone());
});


function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
			// remove previous loaded data
			$('#search_results').empty();
			for (var i = 0; i < 20; i++) {
				if (data[i].artwork_url == null) {
					image_url = "./no-image-found.jpg";
				} else {
					image_url = data[i].artwork_url;
				}
				var div = "<div id='song'><button id='play'>Play</button><button id='addlist'>Add to Playlist</button><p>" + data[i].title + "</p><p>"+ data[i].user.username + "</p><img src='"+ image_url +"' alt='" + data[i].title +"'/><a href='"+ data[i].permalink_url +"'></a></div>"
				$("#search_results").prepend(div);
			};
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
