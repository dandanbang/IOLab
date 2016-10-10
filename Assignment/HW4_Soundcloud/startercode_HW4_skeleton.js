// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
			for(i=0; i < 21; i++) {
				// console.log(data);
				var albumcover = data[i].artwork_url
                var songtitle = data[i].title
				$('#music-list').append("<div class='search-result'> <img src= '"+  albumcover + "'> <h3> "+ songtitle + "</h3> <button class='btn btn-primary' id='add'> Add to playlist</button> <button class='btn btn-danger' id='play' value='"+ $(data)[i].permalink_url + "'> Play  </button> </div>");

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

$(document).ready(
    $("#search").on('click', function() {
        // once the document loads, load the data from SoundCloud API
        $("#music-list").empty();
        var query = $('.music-search').val();
        if (query != "") {
    		callAPI(query);
    	}

    })
);

$("#music-list").on('click', "#add", function() {
        
        // move from musiclist container to playlist container     
        var Songs = $(this).parent()
        var Copy = Songs.clone()
        $("#playlist").prepend(Copy);
        $(Copy).children('#add').html("Remove");
        $(Copy).append("<div id='buttondiv'> <button class='btn btn-warning' id='up'> Up </button><button class='btn btn-success' id='down'> Down </button></div>");
       
       
});

$("#music-list").on('click', "#play", function() {
        // play the music
        $(this).html("Stop");
        var playsong = $(this).val();
        changeTrack(playsong);

});

$('#playlist').on('click', '#up' ,function() {
    // alert('Hi');
    var movingup = $(this).parent().parent();
    $(movingup).insertBefore($(movingup).prev());

});

$('#playlist').on('click','#down', function() {

    var movingdown = $(this).parent().parent();    
    $(movingdown).insertAfter($(movingdown).next());

});

$("#playlist").on('click', "#add", function() {
        // delete songs from playlist
        var Songs = $(this).parent().remove();


});

$("#playlist").on('click', "#play", function() {
        // play the music
        var playsong = $(this).val();
        changeTrack(playsong);

});




