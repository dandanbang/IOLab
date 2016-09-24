$(document).ready(function() {
  // once the document loads, create new item with this function
  $("#new-item").unbind('click').click(function() {
    	var addItem = $('input[name=ListItem]').val();
      $('#todo_ol').prepend('<li>' + addItem + '<button>' + '</button>' + '</li>');
  });
	//sortable allows for rearranging
  $('ol').sortable();  
  //clears input box when clicking back into it
  $('input').focus(function() { 
        $(this).val('');
  });
  //allows to input task by pressing "return"
  $("input[name=ListItem]").keyup(function(event) {
    if(event.keyCode == 13) {
      $("#new-item").click().reset();
    }         
  });
});

$("#list_todo").on('click', 'button', function() {
        // move from list_todo container to list_completed container
        $(this).closest('li').toggleClass('selected'); //assign object class as 'selected' after button click
        $('#completed_ol').prepend('<li>' + $('#todo_ol .selected').text() + '<button>' + '</button>' + '</li>').end();
      	$('#todo_ol .selected').remove(); //clear what you've selected so you won't compound the list entries
});

$("#list_completed").on('click', 'button', function() {
        // move back from list_completed container to list_todo container
        $(this).closest('li').toggleClass('selected'); //assign task as 'selected' after button click
      	$('#todo_ol').prepend('<li>' + $('#completed_ol .selected').text() + '<button>' + '</button>' + '</li>').end();
      	$('#completed_ol .selected').remove(); //clear what you've selected so you won't compound the list entries
});
