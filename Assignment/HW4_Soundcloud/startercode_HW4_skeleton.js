// # Issues to fix: add a same song to the playlist
// 		  add to playlist will change the order of original list

// set global index to load more data
var j = 1;
var box = "";

// Event hander for calling the SoundCloud API using the user's search query
$(document).ready(function(e) {
	$('#search_button').click(function() {
		text = $("input")[0].value; //Get input value
		// Check input length without space
		if ( $.trim(text).length == 0) {
			alert("You must enter some text");
			return;
		}
		box = "search"
		callAPI(text);
		$("input")[0].value = "";
	})

});

// paly button hadnler, call changeTrack function
$(document).on("click", "#play", function(){
	song_url = $(this.parentNode).children('a').attr('href');
	changeTrack(song_url);
	var first_tag = $(this.parentNode).attr("tag");
	box = "related";
	callAPI(first_tag);
});

// add to list button event handler
$(document).on("click", "#addlist", function(){
	$('#search_results .lists ul').prepend($(this.parentNode).clone());
	var down_button = "<button id='down'>Down</button>";
	$(down_button).insertAfter($(this));
	$("#play_list .lists ul").prepend($(this.parentNode));
	$("#play_list .lists #addlist").text("Up");
	$("#play_list .lists #addlist").attr("id", "up");
});


// move song up a step in playlist
$(document).on("click", "#up", function() {
	var pre_song = $(this.parentNode).prev();
	$($(this.parentNode)).insertBefore($(pre_song));
});

// move song down  step in playlist
$(document).on("click", "#down", function() {
	var next_song = $(this.parentNode).next();
	$($(this.parentNode)).insertAfter($(next_song));
});


function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
			if ( box == "search") {
				$('#search_results .lists ul').empty();
			} else if (box == "related") {
				$('#related_list .lists ul').empty();
			}
			for (var i = 0; i < 20; i++) {
				data[i].tag_list.split(" ")[0];
				if (data[i].artwork_url == null) {
					image_url = "./no-image-found.jpg";
				} else {
					image_url = data[i].artwork_url;
				}
				var div = "<div id='song' tag='" + data[i].tag_list.split(" ")[0] + "' ><button" + " id='play'>Play</button><button id='addlist'>Add to Playlist</button><p>" + data[i].title + "</p><p>"+ data[i].user.username + "</p><img src='"+ image_url +"' alt='" + data[i].title +"'/><a href='"+ data[i].permalink_url + "'></a></div>";
				if ( box == "search") {
					window.globaldata = data;
					$('#search_results .lists ul').append(div);
				} else if (box == "related") {
					$("#related_list .lists ul").append(div);
				}
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

// Scroll handler
$(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
			if (window.globaldata == undefined) {   // escape window.globaldata undefined issue
				return;
			} else if (j == window.globaldata.length % 20) {
				alert("No more songs.");
				return;
			} else {
			   for (var i = 20*j; i < (j + 1) * 20; i++) {
				   if (window.globaldata[i].artwork_url == null) {
					   image_url = "./no-image-found.jpg";
				   } else {
					   image_url = window.globaldata[i].artwork_url;
				   }
				   var div = "<div id='song' tag='" + window.globaldata[i].tag_list.split(" ")[0] + "' ><button" + " id='addlist'>Add to Playlist</button><p>" + window.globaldata[i].title + "</p><p>"+ window.globaldata[i].user.username + "</p><img src='"+ image_url +"' alt='" + window.globaldata[i].title +"'/><a href='"+ window.globaldata[i].permalink_url +"'></a></div>"
				   $("#search_results .lists ul").append(div);
			   }
		   }
		   j++;
    }
});
