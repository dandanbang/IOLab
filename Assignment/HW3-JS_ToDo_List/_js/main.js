var number_of_lists = 1;
var current_list = '#list-1';

// Add a todo item to the current list
$(document).ready(
    $("#new-item").on('click', function() {
        // once the document loads, create new item with this function
        // get the user input
        var user_input = $('#todo-item-input').val();
        // create an <li> element with a button using the user input
        if (user_input.trim() != '') {
        	$(current_list).children('.todo').children('.list_todo').prepend('<li> <button class="item-button"> &#9758; </button>' + user_input + '</li>');
        	$('#todo-item-input').val('');	
        }
    })
);

// Move item between todo to completed
$(document).on('click', '.item-button', function() {
    // get <li> container
    var item = $(this).parent();

    // Determine current item status and move to the other status while updating the button icon
    if (item.parent().attr('class') === 'list_todo') {
	    $(this).html('&#9756;');
	    $(current_list).children('.complete').children('.list_completed').prepend(item);
    } else {
    	$(this).html('&#9758;');
    	$(current_list).children('.todo').children('.list_todo').prepend(item);
    };
});

// Create a new list and switch to it
$("#new-list").on('click', function() {
	// if adding the second list, create a button for lists 1 and 2
	if (number_of_lists === 1) {
		$('#info').append('<button class="lists-button" id="list-' + number_of_lists + '-button">To Do List: ' + number_of_lists + '</button>');
	}
	// create a new list upon clicking the button so long as there are 10 or fewer total lists
	if (number_of_lists < 10) {
		number_of_lists++;
		$('#info').append('<button class="lists-button" id="list-' + number_of_lists + '-button">To Do List: ' + number_of_lists + '</button>');
		$('#list-container').append('<div id="list-' + number_of_lists + '" class="lists"><div class="list todo"><h2>List ' + number_of_lists + ' of Things to Do</h2><div class="list_todo"></div></div><div class="list complete"><h2>List ' + number_of_lists + ' of Things Completed</h2><div class="list_completed"></div></div></div>');
		// hide previous current list
		$(current_list).css('display','none');
		// set current list to new list
		current_list = '#list-' + number_of_lists;
		// unhide new current list
		$(current_list).css('display','');
	} else {
		alert('Too Many Lists Created');
	};
});

// Switch between existing lists
$(document).on('click', '.lists-button', function() {
	// hide previous current list
	$(current_list).css('display','none');
	// match to the list id from the button id
	var temp_id = this.id.split('-');
	// unhide new current list
	$('#' + temp_id[0] + '-' + temp_id[1]).css('display','');
	// set current list
	current_list = '#' + temp_id[0] + '-' + temp_id[1];
});