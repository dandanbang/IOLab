// $(document).ready(
//     $(function(){
//     console.log("ready!");
    // 
//     })

// );

// $("#list_todo").on('click', "button", function() {
//         // move from list_todo container to list_completed container
// });

// $("#list_completed").on('click', "button", function() {
//         // move back from list_completed container to list_todo container
// });


$( document ).ready(function() {
    var submitNewItem = function() {
    // Add the new item to the to-do list
        console.log("button is ready!");
        var newValue = $('.new-input').val();
        if (newValue !== '') {
            $('#list_todo').prepend("<li> <button class='btn waves-effect waves-light'> Completed </button>" + newValue + "</li>")   
            $('.new-input').val('');
        };
    }
    
    $("#input").keypress(function(event) {
        // Submit the new item when user pressing the "enter" key
    if (event.which == 13) {
        event.preventDefault();
        console.log("form is ready!");
        submitNewItem();
    }
    });

    $("#new-button").on('click', function(){
        // Submit the new item when user click on the "add" button
        submitNewItem();
    });

    $("#list_todo").on('click', "button", function(){
        // Move from to-do to completed
        console.log($(this).parent());
        $(this).html("Add to to-do");
        $(this).addClass("completed-button");
        var completedItem = $(this).parent()
        $("#list_completed").prepend(completedItem);
    });

    $("#list_completed").on('click', 'button', function(){
        //Move from completed to to-do
        console.log("move is ready!");
        $(this).html("Completed");
        $(this).removeClass("completed-button");
        var todoItem = $(this).parent()
        $("#list_todo").prepend(todoItem);

    });



});