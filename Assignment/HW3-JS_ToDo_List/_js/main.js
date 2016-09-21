$(document).ready(  // When user clicks "Add To-do" button, a task is added to the to-do list along with a "Done" button
    $("#new-item").on('click', function() {
        // once the document loads, create new item with this function
        var user_input = $('#to-do').val();
        if (user_input != "") {
            $('#list_todo').prepend("<li style=list-style-type:none>" + user_input + "<button> Done </button>" + '<br/>' + "</li>");
            $('#to-do').val("");
         }
    })
);

$("#list_todo").on('click', "button", function() { // When user clicks "Done" button, task is added to Completed list.
        // move from list_todo container to list_completed container
        $(this).html("Add to To-do List");

        var completedItem = $(this).parent();
        $("#list_completed").prepend(completedItem);
});

$("#list_completed").on('click', "button", function() { // When user clicks "Add to To-do List" button, re-adds to the To-do list.
        // move back from list_completed container to list_todo container
        $(this).html("Done");
        var addAgain = $(this).parent();
        $("#list_todo").prepend(addAgain);
});
