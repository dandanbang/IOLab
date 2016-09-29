// Event hander for calling the SoundCloud API using the user's search query
$(document).ready(
    $("#add-item").on('click', function() {
 		$('#to-dos').empty();
        var query =  $("#to-do-input").val();
        // console.log(query);
       	callAPI(query);
        $("#to-do-input").val(""); // Clear the form
    })
);


function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
			// console.log(data);
			for(var i=0; i<20; i++)
			{
				// console.log(data[i]);
				var song_title = data[i]["title"];
				var artist = data[i]["user"]["username"];
				var artwork = data[i]["artwork_url"];
				var song_url = data[i]["permalink_url"];
				if(song_title == null){
					song_title = "No Title";
				}
				if(artist == null) {
					artist = "No Artist"
				}
				if(artwork == null) {
					artwork = "http://www.smokovich.com/wp-content/uploads/2015/11/soundcloud.png";
				}
				
				list_html = $('<li>').append(
								$('<div class="row song-display">').append(
									$('<div class="col-md-6">').append(
										$('<img src="'+artwork+'" class="artwork" alt="'+song_url+'">')
									)
								)
								.append(
									$('<div class="col-md-6">').append(
										$('<p>'+song_title+'</p>')
									)
									.append(
										$('<p>'+artist+'</p>')
									)
									.append(
										// $('<button type="button" id="playbutton" class="btn" onclick="playButtonPress()"><i class="glyphicon glyphicon-play"></i>'	
										$('<span class="glyphicon glyphicon-play" id="play-icon" aria-hidden="true" title="Play Song"></span>')
									)
									.append(
										$('<span class="glyphicon glyphicon-plus-sign" id="add-to-playlist-icon" aria-hidden="true" title="Add to playlist"></span>')
									)
								)
							);
				$('#to-dos').append(list_html);
				// console.log(song_title,",",artist,",",artwork);
			}
			
		},'json'
	);
}

$("#to-dos").on('click', "#add-to-playlist-icon", function() {

	var song_title = $(this).siblings().eq(0).text();
	var artist = $(this).siblings().eq(1).text();
	var artwork = $(this).parent().siblings().eq(0).children().eq(0).attr('src');
	var song_url = $(this).parent().siblings().eq(0).children().eq(0).attr('alt');
	
	// Checking if the item is already present in the playlist
	exists_check = $('#dones').find("img[alt='"+song_url+"']").length;
	if(exists_check > 0)
	{
		return;
	}

	list_html = $('<li>').append(
								$('<div class="row song-display">').append(
									$('<div class="col-md-6">').append(
										$('<img src="'+artwork+'" class="artwork" alt="'+song_url+'">')
									)
								)
								.append(
									$('<div class="col-md-6">').append(
										$('<p>'+song_title+'</p>')
									)
									.append(
										$('<p>'+artist+'</p>')
									)
									.append(
										// $('<button type="button" id="playbutton" class="btn" onclick="playButtonPress()"><i class="glyphicon glyphicon-play"></i>'	
										$('<span class="glyphicon glyphicon-play" id="play-icon" aria-hidden="true" title="Play Song"></span>')
									)
									.append(
										$('<span class="glyphicon glyphicon-remove-sign" id="remove-from-playlist-icon" aria-hidden="true" title="Remove"></span>')
									)
									.append(
										$('<span class="glyphicon glyphicon-arrow-up" id="up-icon" aria-hidden="true" title="Move Up"></span>')
									)
									.append(
										$('<span class="glyphicon glyphicon-arrow-down" id="down-icon" aria-hidden="true" title="Move Down"></span>')
									)
								)
							);
	$(dones).prepend(list_html);


});

$("#dones").on('click', "#remove-from-playlist-icon", function() {
	$(this).parent().parent().parent().remove();
});

$("#dones").on('click', "#up-icon", function() {
	// Current - $(this).parent().parent().parent()
	// Previous - $(this).parent().parent().parent().prev()
	$(this).parent().parent().parent().insertBefore($(this).parent().parent().parent().prev());

});

$("#dones").on('click', "#down-icon", function() {
	// Current - $(this).parent().parent().parent()
	// Next - $(this).parent().parent().parent().next()
	$(this).parent().parent().parent().insertAfter($(this).parent().parent().parent().next());

});



$("#to-dos").on('click', "#play-icon", function() {
	var song_url = $(this).parent().siblings().eq(0).children().eq(0).attr('alt');
	changeTrack(song_url);
});


$("#dones").on('click', "#play-icon", function() {
	var song_url = $(this).parent().siblings().eq(0).children().eq(0).attr('alt');
	changeTrack(song_url);
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


// callAPI("hello");