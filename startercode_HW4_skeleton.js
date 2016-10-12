$(document).ready(function() {

	// call API by sending the input value
	$('#search').on('click', function() {
		callAPI($('#userInput').val());
	})

	// call changeTrack by sending the permalinkUrl
	$('body').on('click', '.play-btn', function() {
		var permalinkUrl = $(this).closest('.song').attr('data-permalinkUrl');
		changeTrack(permalinkUrl);
	})

	// Clones element and append to playlist
	$('body').on('click', '.add-btn', function() {
		var $song = $(this).closest('.song')
		var $playlistSong = $song.clone();
		$playlistSong.find('.add-btn').remove();
		var $removeBtn = $("<button>", {type: 'button', class: 'remove-btn', text: 'Remove'});
		var $upBtn = $("<button>", {type: 'button', class: 'up-btn', text: 'Up'});
		var $downBtn = $("<button>", {type: 'button', class: 'down-btn', text: 'Down'});
		$playlistSong.append($removeBtn, $upBtn, $downBtn);
		$('.playlist').append($playlistSong);
	})

	// Remove the clicked element
	$('body').on('click', '.remove-btn', function() {
		$(this).closest('.song').remove();
	})	


	// Moves the element up one level
	$('body').on('click', '.up-btn', function() {
		var $prev = $(this).closest('.song').prev();
		$(this).closest('.song').insertBefore($prev);
	})

	// Moves the element down one level
	$('body').on('click', '.down-btn', function() {
		var $next = $(this).closest('.song').next();
		$(this).closest('.song').insertAfter($next);
	})
})

// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '50'},
		function(data) {
			displaySongs(data);
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

// iterated over all songs and displays them
function displaySongs(songsList) {
	$('.songs').empty();
	$(songsList).each(function() {
		var $songObj = $("<div>", {class: 'song', "data-permalinkUrl": this.permalink_url});
		var $songTitle = $("<p>", {html: this.title, class: 'song-title'});
		var $playBtn = $("<button>", {type: 'button', class: 'play-btn', text: 'Play'});
		var $addToPlaylistBtn = $("<button>", {type: 'button', class: 'add-btn', text: 'Add to playlist'});
		var $image = $("<img>", {src: this.artwork_url, class: 'song-img'});
		$songObj.append($image, $songTitle, $addToPlaylistBtn, $playBtn);
		$('.songs').append($songObj);
	})

	var $playlist = $("<div>", {class: 'playlist'});
	$('#container').append($playlist);
}