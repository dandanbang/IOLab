$(document).ready(
    $("#new-item").on('click', function() {
        console.log("haiiii");
        // once the document loads, create new item with this function
        var user_input = $('#todo-item-input').val();
        // alert(user_input);
        $('#list_todo').prepend("<li> <button> Move me! </button>" + user_input + "</li>");
    })
);

$("#list_todo").on('click', "button", function() {
        // move from list_todo container to list_completed container
        $(this).html("Add to To-Do");
        var completedItem = $(this).parent()
        $("#list_completed").prepend(completedItem);
    });