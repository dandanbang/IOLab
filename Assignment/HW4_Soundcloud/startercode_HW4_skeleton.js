$(document).ready(
    $("#new-item").on('click', function() {
        // once the document loads, create new item with this function
    	// To remove any songs in the search results tab
        remove_song();
        //Getting search query from user
        var user_input = $("#todo-item-input").val();
        callAPI(user_input)
        // Adding drag drop functionality to the playlist and search list
        $("#list_todo").sortable();
        $("#list_completed").sortable();
    })
);



// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '20'},
		function(data) {
			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
			get_song_data(data)			
		},'json'
	);
}

// 'Play' button event handler - play the track in the Stratus player
function changeTrack(url) {
	// console.log("inside change track, with URL: " + url)
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

//Function to get the attributes of the song returned by callAPI
function get_song_data(songs){
	// Iterating through the list of songs
	for (var song in songs) {
		if (songs.hasOwnProperty(song)) {
			var obj = songs[song]
    		var title = obj["title"];
    		var image_url = obj["artwork_url"]
    		var play_link = obj["permalink_url"]
			// Appending the list with the extracted data from song
    		$("#list_todo").append('<li class = song_list> <img id = song_image src = '+image_url+'></img>' + title + '<button id = play_button class = '+ play_link + '> Play </button> <button id = add_to_playlist> Add to Playlist </button> </li>')
		}
	 
	}
}


// Function to empty song list upon new search
function remove_song(){
	$("#list_todo").empty();
}


$("#list_todo").on('click', "#play_button", function() {
        // 1. Play song, 2. Add song in the play list
        var url = ($(this).attr('class'));
        changeTrack(url)
        var completedItem = $(this).parent().clone()
        $("#list_completed").prepend(completedItem)
        $("#list_completed #add_to_playlist").html(" Remove ");
});


$("#list_todo").on('click', "#add_to_playlist", function() {
        // Add song to the play list
        $(this).html(" Add to Playlist ");
        var completedItem = $(this).parent().clone()
        $("#list_completed").prepend(completedItem)
        $("#list_completed #add_to_playlist").html(" Remove ");
});


$("#list_completed").on('click', "#play_button", function() {
        // Play song from the play list
        var url = ($(this).attr('class'));
        changeTrack(url)
});



$("#list_completed").on('click', "#add_to_playlist", function() {
        // Remove song from the play list
        $(this).html(" Add to Playlist ");
        var completedItem = $(this).parent()
        $(completedItem).remove()
        
});