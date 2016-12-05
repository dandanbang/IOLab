// main //
$(document).ready(
  $("#search-button").on('click', function(){
    // Passing user query to the API
    $("#results").html("");
    var userQuery = $("#search-input").val();
    callAPI(userQuery);

    $("#results").on('click', '.playlist-button', function(){
      var div = $(this).parent();
      
      addToPlaylist(div.parent());
    })

    $("#playlist").on('click', '.playlist-button', function(){
      var div = $(this).parent();
      
      removeFromPlaylist(div.parent());
    })

    $("#playlist").on('click', '.move-up', function(){
      
      var div = (($(this).parent()).parent()).parent();
      moveUp(div);
    })
    $("#playlist").on('click', '.move-down', function(){
      
      var div = (($(this).parent()).parent()).parent();
      moveDown(div);
    })

  })
);

function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {


      var resultsHeader = "<h3 id = 'results-header'>Search Results</h3>";
      $("#results").append(resultsHeader);
      for(i = 0; i < 200; i++){
        var song = data[i].title;
        var artist = data[i].user.username;
        var picture = data[i].artwork_url;
        if (picture == null){
          picture = data[i].waveform_url;
         
        }
        var permalink = data[i].permalink_url;
        interpreter(song, artist, picture, permalink);
      }

		},'json'
	);
}

function interpreter(songData, artistData, pictureData, permalink){
  // get data 
  var song = "<p >" + songData + "</p>";
  var artist = "<p >" + artistData + "</p>";
  var picture = "<img src ='" + pictureData + "'/>";
  var playButton = "<button class = ' fa fa-play' name = 'silent' id = '" + permalink + "' onClick = 'player(this)'></button>";
  var playlistButton = "<button class = 'playlist-button'>Add to Playlist</button><div class = 'up-and-down'></div>";
 var divWrapper = "<div >" + picture + playButton + "</div>" + "<div class = 'song-meta'>" + song + artist + playlistButton + "</div>";
 $("#results").append("<li class = 'song-object'>" + divWrapper + "</li>");
}

function player(song){
  //control player
  if(song.attributes["name"].value == 'silent'){
    song.attributes["class"].value = ' fa fa-pause';
    song.attributes["name"].value = 'playing';
    changeTrack(song.id, 1);
    
  }
  else {
    song.attributes["class"].value = ' fa fa-play';
    song.attributes["name"].value = 'silent';
    changeTrack(song.id, 0)
  }

}
function addToPlaylist(x){
  $("#playlist-header").html("Your Playlist:");
  x.clone().prependTo("#playlist");
  (($("#playlist").children('.song-object')).children('.song-meta')).children('.playlist-button').html('Remove from Playlist');

 
  var moveUp = "<button class = 'move-up fa fa-angle-up'></button>";
  var moveDown = "<button class = 'move-down fa fa-angle-down'></button>";
  var upAndDown = moveUp + moveDown;
  ((($("#playlist").children('.song-object')).children('.song-meta')).children('.up-and-down')).html(upAndDown);
}
function removeFromPlaylist(x){
  // removes song from Play list
  x.remove();
}
function moveUp(x){
  // moving song up in the wait list 
  var prev = $(x).prev();
  $(x).insertBefore(prev);
}
function moveDown(x){
  // moving song down in the playlist
  var next = $(x).next();
  $(x).insertAfter(next);
}

// 'Play' button 
function changeTrack(url, x) {
  

  $('#stratus').remove();

  if (x == 1){
  	
  	$.stratus({
        key: "b3179c0738764e846066975c2571aebb",
        auto_play: true,
        align: "bottom",
        links: url
      });
  }

}
