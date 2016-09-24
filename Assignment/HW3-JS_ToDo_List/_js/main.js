$(document).ready(
	function(){
    $("#new-item").on('click', function() {
        // once the document loads, create new item with this function
       
        var toAdd = $('input[id=task]').val();
                 $('#list_todo').prepend('<div>' + toAdd + ' <button class ="complete">Complete</button></div>');
    });



$("#list_todo").on('click', "button", function() {
        // move from list_todo container to list_completed container
        console.log("Efs");
        
        			$(this).parent().children('.complete').html("In Complete");
                  $('#list_completed').prepend($(this).parent());
});

$("#list_completed").on('click', "button", function() {
        // move back from list_completed container to list_todo container
        $(this).parent().children('.complete').html("Complete");
                  $('#list_todo').prepend($(this).parent());
});
}
);