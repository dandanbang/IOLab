//main.js created by Robin Oh
//handles the back and forth between to do listss

$(document).ready(
    $("#new-item").on('click', function() {
        // once the document loads, create new item with this function
        var user_input = $("#todo-item-input").val();
        $("#list_todo").prepend("<li> <button> Completed! </button>" + user_input + "</li>");
    })
);

$("#list_todo").on('click', "button", function() {
        // move from list_todo container to list_completed container
        $(this).html("Add To do");
        var completedItem = $(this).parent();
        $("#list_completed").hide();
        $("#list_completed").prepend(completedItem);
        //animation
        $("#list_completed").slideToggle();
});

$("#list_completed").on('click', "button", function() {
        // move back from list_completed container to list_todo container
        $(this).html("Completed!");
        var back2Todo = $(this).parent();
        $("#list_todo").hide();
        $("#list_todo").prepend(back2Todo);
        //animation
        $("#list_todo").slideToggle()
});
