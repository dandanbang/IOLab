//created by Robin Oh

// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
    $.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
        {'q': query,
        'limit': '200'},
        function(data) {
            // PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
            // HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
            display_20(data)
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


//clicking on the search bar
$(document).ready(
        $("#search_button").on('click', function() {
            get_search()
        })
    );

//pressing enter on the search funtion
$('#search_bar').bind("enterKey",function(e){
    get_search()
});

//pressing enter on the search funtion  
$('#search_bar').keyup(function(e){
    if(e.keyCode == 13)
    {
        $(this).trigger("enterKey");
    }
});

//get variable from the search bar, clears existing
function get_search(){
    var user_input = $("#search_bar").val();
    $("#search_bar").val('');
    callAPI(user_input)
}

//display the first 20 got from soundcloud api
function display_20(dick){
    
    $("#search_body").empty();

    for(var i=0;i<20; i++){
        var artist = dick[i].artist;
        var title = dick[i].title;
        var image = dick[i].artwork_url;
        var permalink = dick[i].permalink_url;
        if(image == null){
            if(i%2==0){
                       image = "https://store-images.s-microsoft.com/image/apps.62807.9007199266242506.1b72c6b3-a4b4-4841-b9f2-f45f38b18c8f.fd6d73e9-8feb-4c96-bb77-84bd32fac8c2?w=96&h=96&q=60"
            } else{
            image="OhLogo.png"                
            }
        }
        //creates play button and add to playlist button
        $('#search_body').append("<tr>\
                                           <td>" + title + "</td>\
                                           <td> <img src = '" + image + "'> </td>\
                                           <td> <button data-url=" + permalink +
                                                " type='button' class='btn btn-default btn-lg play' role='button'>\
                                                    <span class='glyphicon glyphicon-play' aria-hidden='true'></span> Play\
                                                </button></td>\
                                            <td> <button type='button' class='btn btn-default btn-lg add' role='button'>\
                                                    <span class='glyphicon glyphicon-plus' aria-hidden='true'></span> Playlist\
                                                </button></td>\
                                      </tr>")
    }
}

//when clicked on play button, plays the song
$("table").on('click', '.play', function() {
    var url = (this).getAttribute("data-url")
    changeTrack(url)
})


//when clicked on add to list button, adds to the playlist
$("#displayed_search").on('click', '.add', function() {
    var copy = $(this).parent().parent().clone();

    // changes the plus sign to minus sign
    var to_change= $(copy).find("span").eq(1)
    $(to_change).removeClass('glyphicon-plus').addClass('glyphicon-minus')

    //add up and down button
    $(copy).append("<td> <button type='button' class='btn btn-default btn-lg up' role='button'>\
                                                    <span class='glyphicon glyphicon-menu-up'></span>\
                                                </button></td>")

    $(copy).append("<td> <button type='button' class='btn btn-default btn-lg down' role='button'>\
                                                    <span class='glyphicon glyphicon-menu-down'></span>\
                                                </button></td>")


    $('#playlist').prepend(copy)

})

//remove song from playlist
$("#playlist").on('click', '.add', function() {
    $(this).parent().parent().remove();
})

//Make the songs go up one in the playlist
$("#playlist").on('click', '.up', function() {
    $(this).parent().parent().insertBefore($(this).parent().parent().prev());
})

//Make the songs go down one in the playlist
$("#playlist").on('click', '.down', function() {
    $(this).parent().parent().insertAfter($(this).parent().parent().next());
})