$(document).ready(
    $("#new-item").on('click', function() {
        // alert("wattup");
        // once the document loads, create new item with this function
        var user_input = $('#todo-item-input').val();
        // alert(user_input);

        $('#list_todo').prepend("<li> <button> Move me! </button>" + user_input + "</li>");
        $('#todo-item-input').val('');
    })
);

$("#list_todo").on('click', "button", function() {
        // console.log($(this).parent());
        // move from list_todo container to list_completed container
        $(this).html("Add To To-Do"); 

        var completedItem = $(this).parent() //gets from li element. One parent above
        $("#list_completed").prepend(completedItem); 
});

$("#list_completed").on('click', "button", function() {
        // move back from list_completed container to list_todo container
        
        var incompletedItem = $(this).parent()
        $("#list_todo").prepend(incompletedItem); 

        $(this).html("Move me!"); 

});

        
