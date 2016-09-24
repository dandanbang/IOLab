$(document).ready(
    $("#add-item").on('click', function() {
 
        var todo =  $("#to-do-input").val(); // Get value from the form
        var move_to_done = '<span class="glyphicon glyphicon-triangle-right" id="completed-icon" aria-hidden="true"></span>';
        if(todo.trim() != "") {
        	$("#to-dos").prepend('<li>' + todo + move_to_done + '</li>'); // Add to the to-do list
        }
        $("#to-do-input").val(""); // Clear the form
    })
);

$("#to-dos").on('click', "#completed-icon", function() {
        // move from to do to done
        var done = $(this).parent().not('span').text().trim(); // Get only the text 
        var move_to_do = '<span class="glyphicon glyphicon-triangle-left" id="incomplete-icon" aria-hidden="true"></span>';
        var move_to_done = '<span class="glyphicon glyphicon-triangle-right" id="completed-icon" aria-hidden="true"></span>';
        $("#dones").prepend('<li>' + move_to_do + done + move_to_done +'</li>');
        $(this).parent().hide();

});

$("#dones").on('click', "#incomplete-icon", function() {
        // move back from done to to do
        var todo = $(this).parent().not('span').text();
        var move_to_done = '<span class="glyphicon glyphicon-triangle-right" id="completed-icon" aria-hidden="true"></span>';
        $("#to-dos").prepend('<li>' + todo + move_to_done + '</li>'); // Add to the to-do list
        $(this).parent().hide();

});
