// Event hander for calling the SoundCloud API using the user's search query
// store the title, song URL, picURL and display them



function processResponse(data){
	for (i = 0; i < 20; i++) {

 		if (data[i].artwork_url !== null) {
			var artwork = data[i].artwork_url;	
 	       }
        else {
        	var artwork = "http://pix.iemoji.com/images/emoji/apple/ios-9/256/frowning-face-with-open-mouth.png";
        }

		var title = data[i].title;
		var url = data[i].permalink_url; 
		var artist = data[i].user.username;	

		$('#list_todo').prepend("<ol>"+"<img src="+artwork+">" + title + artist + "   <button class='addtoplaylist' id='addtoplaylist'> Yasss! Add to Playlist </button>" + "<button class='play' id="+url+"> or, Play me! </button></ol>").css('color', 'blue');
	}
	// console.log(artwork)
}


function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query, 'limit': '200'}, function(data) {
// PROCESS THE SOUNDCLOUD API'SRESPONSE OBJECT
			processResponse(data)
			// console.log(data)
		},'json'
	);
}

$("#new-item").on('click', function() {
	// take search term and pass as user input
	var user_input = $('#todo-item-input').val();
	callAPI(user_input)
})


$("#list_todo").on('click', ".addtoplaylist", function() {
        // move from search container to playlist container
        $(this).html('Remove').attr('class', 'remove');
        var completedItem = $(this).parent();
        $(completedItem).clone().appendTo("#list_completed").append("<button class='up'>Up</button>" + "<button class='down'>Down</button>").css('color', 'green');
});


$("#list_completed").on('click', ".remove", function() {
        // remove song
        $(this).html("Add to PlayList");
        var todoItem = $(this).parent();
        $(todoItem).remove();

});

$(document).on('click', '.up', function(){
	// move song up in playlist
	$(this).parent().insertBefore($(this).parent().prev());
})
 
$(document).on('click', '.down', function(){
	//move song down in playlist
    $(this).parent().insertAfter($(this).parent().next());
})

$(document).on('click', '.play', function () {
	// pass song url to stratus function to play
	var url = $(this).attr('id');
    changeTrack(url);
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


