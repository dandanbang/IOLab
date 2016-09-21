$(document).ready(
    $("#new-item").on('click', function() {
        // once the document loads, create new item with this function
        
        var user_input = $('.todo-input').val();
        if(user_input != ""){
        $('#list_todo').prepend("<li class='newlist'> <button class='statusbutton'> Complete!</button>" + user_input + "</li>");
        $('.todo-input').val('');
    }

    })
);

$("#list_todo").on('click', "button", function() {
        // move from list_todo container to list_completed container
        // console.log($(this).parent());
        $(this).html("Add to-do");

        var completedItem = $(this).parent()
        $("#list_completed").prepend(completedItem);
});

$("#list_completed").on('click', "button", function() {
        // move back from list_completed container to list_todo container

        $(this).html("Complete!");

        var completedItem = $(this).parent()
        $("#list_todo").prepend(completedItem);

});



// remove class
// add class






