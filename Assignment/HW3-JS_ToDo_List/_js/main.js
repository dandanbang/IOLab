$(document).ready(
    $("#new-item").on('click', function() {
        // once the document loads, create new item with this function
        var user_input = $('#todo-item-input').val();
        // save the input value to the defined variable here
        $('#list_todo').prepend("<li>" + user_input + "<button> Move to Completed-item List </button> </li>");
        // prepend the item containing user_input and the button to '#list_todo'

    })
);

$("#list_todo").on('click', "button", function() {
        // move from list_todo container to list_completed container
        $(this).html("Add to To-do List");
        //change button text
        var completedItem = $(this).parent();
        // save the li which is the parent of this to the defined variable

        $("#list_completed").prepend(completedItem);
        // prepend(move) the item in '#list_todo' to '#list_completed'

});

$("#list_completed").on('click', "button", function() {
        // move back from list_completed container to list_todo container
        $(this).html("Move to Completed-item List");
        //change button text
        var todoItem = $(this).parent();
        // save the li which is the parent of this to the defined variable
        $("#list_todo").prepend(todoItem);
        // prepend(move) the item in '#list_completed' to '#list_todo'

});
