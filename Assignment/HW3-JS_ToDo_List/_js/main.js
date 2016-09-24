
$(document).ready(function(){
    $("#new-item").on('click', function() {
        // once the document loads, create new item with this function
    
    var user_input = $('#todo-item-input').val();

    if (user_input.length > 0 || user_input.trim().length > 0){
    $('#todo-item-input').val("");
    $('#list_todo').prepend("<li> <button class=\"btn btn-info btn-xs\"> Move to Completed </button>   " + user_input + "<p> </p></li>");
    }
    });

   
});

$("#inst1").on('click', function() {
        // show instructions
        if ($("#ul_list").is(":visible")){
        $("#ul_list").hide();	
        }
        else{
        	$("#ul_list").show();	
        }
        
});

$("#list_todo").on('click', "button", function() {
        // move from list_todo container to list_completed container
        //console.log($(this).parent);
        $(this).html("Move to To-do");
        $(this).removeClass("btn btn-info btn-xs");
    	$(this).addClass("btn btn-success btn-xs");      
        var completedItem = $(this).parent();
        $("#list_completed").prepend(completedItem);
});

$("#list_completed").on('click', "button", function() {
        // move back from list_completed container to list_todo container
        $(this).html("Move to Completed");
        var todoitem = $(this).parent();
        $(this).removeClass("btn btn-success btn-xs");
    	$(this).addClass("btn btn-info btn-xs");   
        $("#list_todo").prepend(todoitem);
});


