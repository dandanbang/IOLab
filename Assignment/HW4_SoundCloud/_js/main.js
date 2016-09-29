/* jQuery code to run the music playlist*/

$(document).on("click", ".playlist-add", function () {
	var same = $(this).parent().parent().clone();
	same.children(".song-details").children(".playlist-add").remove();
	same.children(".song-details").append("<button class='up'>Up</button><button class='down'>Down</button><button class='remove'>Remove</button>"); 
	$('#songsList').prepend(same);
});


$(document).ready(
    $("#music").on("click", function() {
        searchSongsAPI($("#find").val());
    })
);

/* jQuery code to play music*/
$(document).on("click", ".play", function () {
	playSong($(this).attr('id'));
});

/* jQuery code for down button functionality*/
$(document).on("click", ".down", function() {
	searchedSong = $(this).parent().parent();
	searchedSong.insertAfter(searchedSong.next());
});

/* jQuery code to search the music*/
function searchSongsAPI(searchQuery) {
	$("#results").children("#songResults").children().remove();
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': searchQuery,
		'limit': '150'},
		function(data) {
			for (var i = 0; i < 18; i++) {
				$("#songResults").append("<div><img src='"+data[i].artwork_url+"'><div class='song-details'><li>"+data[i].title+"</li><li>"+data[i].user.username+"</li>\
											 <button class='play' id='"+data[i].permalink_url+"'>Play Song</button>\
											 <button class='playlist-add'>Add to Playlist</button></div></div>");
			};
		},'json'
	);
}
/* jQuery code for up button functionality*/
$(document).on("click", ".up", function() {
	searchedSong = $(this).parent().parent();
	searchedSong.insertBefore(searchedSong.prev());
});

/* jQuery code to remove song from palylist*/
$(document).on("click", ".remove", function() {
	$(this).parent().parent().remove();
});

/* jQuery function to play music*/
function playSong(url) {
	$('#stratus').remove();
	$.stratus({
      key: "b3179c0738764e846066975c2571aebb",
      auto_play: true,
      align: "bottom",
      links: url
    });
}

