
$(document).ready(function(){
    $("#new-item").on('click', function() {
        // once the document loads, create new item with this function
    remove_songs();
    var user_input = $('#search_item').val();
    //the search is not allowed for empty strings
    if (user_input.length > 0 || user_input.trim().length > 0){
    callAPI(user_input);
    $("#search_results").sortable();    
    $("#playlist").sortable();

    }
    });
});
//this function removes the songs from the search list when a new search is made
function remove_songs(){
	$("#search_results").empty()

};

// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{"q": query,
		"limit": "200"},
		function(data) {
			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
			display_songs(data)
			// console.log(data)
		},'json'
	);
};
//function will gets the soundcloud API object and calls its attributes to display in the search results
function display_songs(data) {
	console.log(data.length);
	var table_html = '<table class = "table">\
						<tr>\
						<td>\
						<button class="glyphicon glyphicon-play btn-lng btn-success" url_to_play = "playurl" id="btn_play"> </button>\
						</td>\
						<td rowspan="2">\
						<img src= "link" id="img1" alt="No pic found">\
						</td>\
						<td >\
						<span id = "song_name">song name</span>\
						</td>\
						</tr>\
						<tr>\
						<td>\
						<button class="glyphicon glyphicon-flash btn-lng btn-info" id = "add_to_playlist" > </button>\
						</td>\
						<td >\
						<span id = "artist_name">artist name</span>\
						</td>\
						</tr>\
						<table>\
						';
	
	for (var i = 20;i >= 0;i--) {
	var table_temp = table_html;
	var song = data[i].title;
	// var song_split = String(song).split("-");
	// var song_name1 = song_split[0];
	var artist = data[i].user.username;
	var link_img = data[i].artwork_url;
	var play_url = data[i].permalink_url;
	// console.log(song_split,song_name1,artist);

	// console.log(song,artist,link_img)

	
	$('#search_results').prepend(table_temp);
	$('#song_name').text(song);
	$('#artist_name').text(artist);
	$('#img1').attr('src',link_img);
	$('#btn_play').attr('url_to_play',play_url);

}
	
};
//function that adds the clicked item into playlist. it can be added multiple times
$("#search_results").on('click',"#add_to_playlist" ,function() {
	
	// console.log("$this", $(this))
	// console.log("this", this)
   var new_html = $(this).parent().parent().parent().parent().clone();
   // console.log("i m heere")
   // console.log($(this).parent().parent().parent().parent())
   // console.log("i m heere 2")
   // console.log($(this).parent().parent().parent())
   // var play_list = $(this).parent();
   // $("#playlist").prepend(play_list);
   
   $("#playlist").prepend(new_html);
   $("#playlist #add_to_playlist").removeClass("glyphicon glyphicon-flash btn-info");
   $("#playlist #add_to_playlist").addClass("glyphicon glyphicon-remove btn-danger");

   
  });
//calls the stratus player to play the music in the search results
$("#search_results").on('click',"#btn_play" ,function() {
	
	// console.log("$this", $(this))
	// console.log("this", this)
   var url = ($(this).attr("url_to_play"));
   // console.log("url", url);
   changeTrack(url);
  });
//calls the stratus player to play the music in the playlist
$("#playlist").on('click',"#btn_play" ,function() {
	
	// console.log("$this", $(this))
	// console.log("this", this)
   var url = ($(this).attr("url_to_play"));
   // console.log("url", url);
   changeTrack(url);
  });
//the remove button removes the item from the playlist
$("#playlist").on('click',"#add_to_playlist" ,function() {
	
	// console.log("$this", $(this))
	// console.log("this", this)
   var new_html_1 = $(this).parent().parent().parent().parent();
   $(new_html_1).remove()
   // console.log("url", url);
   
  });
// // 'Play' button event handler - play the track in the Stratus player
function changeTrack(url) {
	// Remove any existing instances of the Stratus player
	$('#stratus').remove();

	// Create a new Stratus player using the clicked song's permalink URL
	$(this).stratus({
      key: "b3179c0738764e846066975c2571aebb",
      auto_play: true,
      align: "bottom",
      links: url,
    });
};


