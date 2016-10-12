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
        submitNewItem();
    }
    });

    $("#new-button").on('click', function(){
        // Submit the new item when user click on the "add" button
        submitNewItem();
    });

    $("#list_todo").on('click', "button", function(){
        // Move from to-do to completed
        $(this).html("Add to to-do");
        $(this).addClass("completed-button");
        var completedItem = $(this).parent()
        $("#list_completed").prepend(completedItem);
    });

    $("#list_completed").on('click', 'button', function(){
        //Move from completed to to-do
        $(this).html("Completed");
        $(this).removeClass("completed-button");
        var todoItem = $(this).parent()
        $("#list_todo").prepend(todoItem);

    });



});