$(document).ready(function(){

	$("#new-item").on('click', function() {
		var query = document.getElementsByTagName('input')[0].value;
		console.log("searching "+ query);
		callAPI(query);

	});
	// Event hander for calling the SoundCloud API using the user's search query
	function callAPI(query) {
		$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
			{'q': query,
			'limit': '200'},
			function(data) {
				// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
				// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
				//console.log(data);
				get20results(data);

			},'json'
		);
	}

	function get20results(data) {
		console.log(data[0]);

		//empty existing list
		var list = document.getElementById('list_results');
		$(list).empty();

		for (var i = 0; i < 20; i++) {
			var title = data[i].title;
			var artist = data[i].user.username;
			var artwork = data[i].artwork_url;
			var url = data[i].permalink_url;

			//creating list element
			var listItem = document.createElement("li");
      listItem.setAttribute("id", url);
      listItem.setAttribute("class","collection-item");

			//adding artwork to list item
			var image = document.createElement("img");
			image.setAttribute("src", artwork);
			image.setAttribute("height","100px");
			image.setAttribute("width","100px");
			image.setAttribute("alt","artwork not found")
			listItem.appendChild(image);

      //adding the title and artist to the list item
      var text = document.createTextNode("  "+title+" - by "+artist);
			listItem.appendChild(text);

			//adding play button to list item
      var playButton = document.createElement("button");
      playButton.setAttribute("class", "btn-floating waves-effect waves-light deep-orange");
			var icon = document.createElement("i");
			icon.setAttribute("class", "material-icons");
      text = document.createTextNode("play_circle_outline");
			icon.appendChild(text)
      playButton.appendChild(icon);
      listItem.appendChild(playButton);

			//adding save button to list item
      var itemButton = document.createElement("a");
      itemButton.setAttribute("class", "btn-floating btn waves-effect waves-light black-text green lighten-3");
			var add = document.createTextNode("+");
      itemButton.appendChild(add);
      listItem.appendChild(itemButton);

			//adding list item to list
      list.appendChild(listItem);
		}
	}

	//adding to playlist
	$("#results").on('click', "a", function() {
		//get list item
		var id = this.closest("li").id;
		console.log("adding to playlist "+id);
		var item = document.getElementById(id);

		//clone item
		var list = document.getElementById('list_play');
		var myClone = $(item).clone();

		//change button of playlist item
		$(myClone).find("a").attr("class", "btn-floating btn waves-effect waves-light black-text red lighten-3").text("-");

		//adding up button to list item
		var upButton = document.createElement("a");
		upButton.setAttribute("class", "btn-flat btn waves-effect waves-light black-text green");
		//var up = document.createTextNode("&#8679;");
		//upButton.appendChild(up);
		$(upButton).text("up")
		$(myClone).append(upButton);

		//adding down button to list item
		var downButton = document.createElement("a");
		downButton.setAttribute("class", "btn-flat btn waves-effect waves-light black-text green");
		var down = document.createTextNode("down");
		downButton.appendChild(down);
		$(myClone).append(downButton);

		//add item to playlist
		$(list).prepend(myClone);

  });

	//remove from playlist
	$("#playlist").on('click', "a", function() {

		//delete item
		if ($(this).text() == "-") {
			var id = this.closest("li").id;
			console.log("removing from playlist "+id);
			var item = document.getElementById(id);
			$(this.closest("li")).remove();
		}

		//move item up
		if ($(this).text() == "up") {
			var item = this.closest("li");
			console.log("moving up "+item);
			$(item).insertBefore($(item).prev());
		}

		//move item down
		if ($(this).text() == "down") {
			var item = this.closest("li");
			console.log("moving down "+item);
			$(item).insertAfter($(item).next());
		}


	});

	//play song
	$("#results,#playlist").on("click", "button", function() {

		var id = this.closest("li").id;
		changeTrack(id);
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

});
