$(document).ready(
    $("#new-item").on('click', function() {
        // once the document loads, create new item with this function
        var user_input = $('#todo-item-input').val();
        $('#list_todo').prepend("<li><button> Move me! </button>" + user_input + "</li>");
    })
);

//$("#new-list").on('click', function() {
    // once the document loads, create new item with this function
    //$('.ul_list').append($('<ol>',{
        //text: $('#input-new-list').val()
    //}));
//});


$("#list_todo").on('click', "button", function() {
        // move from list_todo container to list_completed container
        ($(this).html("Add To Complete List"));
        var workingItem = $(this).parent();
        $("#working_todo").prepend(workingItem).css("color", "#B10DC9"); //changing the color of a completed item
});


$("#working_todo").on('click', "button", function() {
        // move from list_todo container to list_completed container
        ($(this).html("Add To In Progress List"));
        var completedItem = $(this).parent();
        $("#list_completed").prepend(completedItem).css("color", "#0074D9"); //changing the color of a completed item
});

$("#list_completed").on('click', "button", function() {
        // move back from list_completed container to list_todo container
        ($(this).html("Add To In Progress List"));
        var incompleteItem = $(this).parent();
        $("#working_todo").prepend(incompleteItem);
});
