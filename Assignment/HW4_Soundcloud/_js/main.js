// Gets the user's input and passes it to callAPI function when the user clicks 'Search'
$(document).ready(
    $("#search").on("click", function() {
        var query = $("#query").val();
        api_return = callAPI(query);
    })
);

// Event hander for calling the SoundCloud API using the user's search query
// Search for songs and return the top 20 hits
// Add the top 20 hits to 'Search Results' list with the corresponding picture, song title, and artist name
// Add the permalink_url as the id for the 'play button' so it can be passed to the play function
function callAPI(query) {
	$("#search-results-container").children("#search-results").children().remove();
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
			for (var i = 0; i < 20; i++) {
				var artist = data[i].user.username;
				var title = data[i].title;
				var picture = data[i].artwork_url;
				var permalink = data[i].permalink_url;
				if (picture == null) {
					picture = "_images/missing_image.png";
				};
				$("#search-results").append("<div class='song'><img src='"+picture+"'><div class='song-details'><li>"+title+"</li><li>"+artist+"</li>\
											 <button class='play' id='"+permalink+"'>Play Song</button>\
											 <button class='playlist-add'>Add to Playlist</button></div></div>");
			};
		},'json'
	);
}

// Play a song
$(document).on("click", ".play", function () {
	var permalink_url = $(this).attr('id');
	changeTrack(permalink_url);
});

// Add a song to the playlist; remove 'add to playlist' button; add 'up', 'down', and 'remove' buttons
$(document).on("click", ".playlist-add", function () {
	var clone = $(this).parent().parent().clone();
	clone.children(".song-details").children(".playlist-add").remove();
	clone.children(".song-details").append("<button class='up'>Up</button>\
				  <button class='down'>Down</button>\
				  <button class='remove'>Remove</button>");
	$('#playlist').prepend(clone);
});

// Move Up
$(document).on("click", ".up", function() {
	song = $(this).parent().parent();
	song.insertBefore(song.prev());
});

// Move Down
$(document).on("click", ".down", function() {
	song = $(this).parent().parent();
	song.insertAfter(song.next());
});

// Remove from playlist
$(document).on("click", ".remove", function() {
	$(this).parent().parent().remove();
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
}