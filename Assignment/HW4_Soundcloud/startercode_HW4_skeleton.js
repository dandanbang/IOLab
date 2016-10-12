// Event hander for calling the SoundCloud API using the user's search query
// store the title, song URL, picURL and display them

play_urls = []

function processResponse(data){
    console.log(data)

    for (i = 0; i < 20; i++) { 
        song = data[i];
        table_row = '<tr><td><img src="' + song.artwork_url +'" onerror="this.src=\'soundcloud.png\';" height=100 width=100></td> \
                    <td>' + song.title.slice(0, 15) + '</td> \
                    <td>' + song.user.username + '</td> \
                    <td> <button id="play' + i + '" class="playbutton">Play</button></td><td><button class="playlistbutton" id="play"'+i+'">Add to Playlist</button></td></tr>'

        $('#results_body').append(table_row)
        play_urls.push(song.permalink_url)
    }

}

function callAPI(query) {
    console.log('calling api')
    $.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
        {'q': query, 'limit': '200'}, function(data) {
// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'SRESPONSE OBJECT
// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
            processResponse(data)
            // console.log(data)
        },'json'
    );
}

$(document).on('click', 'button.search-button', function() {
    console.log('clicked button');
    var user_input = $('#search-field').val();
    callAPI(user_input)
})

$(document).on('click', 'button.playbutton', function() {
    console.log('clicked play button');
    id = parseInt($(this).attr("id").slice(4));
    changeTrack(play_urls[id]);
    // var user_input = $('#search-field').val();
    // callAPI(user_input)
})

$(document).on('click', 'button.playlistbutton', function() {
    row = $(this).closest('tr').clone()
    $('.playlistbutton', row).removeClass('playlistbutton')
        .addClass('playlistremovebutton')
        .html('Remove from Playlist');
    $(row).append('<td><button class="moveup">^</button></td>')
    $(row).append('<td><button class="movedown">V</button></td>')
    $('#playlist_body').prepend(row);

    // var user_input = $('#search-field').val();
    // callAPI(user_input)
})

$(document).on('click', 'button.playlistremovebutton', function() {
    $(this).closest('tr').remove()   
})

// http://stackoverflow.com/questions/6712706/jquery-change-the-order-of-two-rows-of-a-table
$(document).on('click', 'button.movedown', function() {
    row = $(this).closest('tr')
    row.insertAfter(row.next());  
})

$(document).on('click', 'button.moveup', function() {
    row = $(this).closest('tr')
    row.prev().insertAfter(row);  
})


// 'Play' button event handler - play the track in the Stratus player
function changeTrack(url) {
    // Remove any existing instances of the Stratus player
    $('#stratus').remove();
    console.log('url: ' + url)
    // Create a new Stratus player using the clicked song's permalink URL
    $.stratus({
     key: "b3179c0738764e846066975c2571aebb",
     auto_play: true,
     align: "bottom",
     links: url
   });
}