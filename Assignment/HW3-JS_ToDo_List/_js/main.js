function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


$(document).ready(
    $("#new-item").on('click', function() {
    	// console.log("haiiii");
        // once the document loads, create new item with this function
        var user_input = $('#todo-item-input').val();
        // alert(user_input);
        $('#list_todo').prepend("<li>"+ user_input + "   <button> Yasss! Add to Completed List </button>" + "</li>").css('color', 'red');
    })
);

$("#list_todo").on('click', "button", function() {
        // move from list_todo container to list_completed container
        $(this).html("Oops. Add Back to To-Do List");
        var completedItem = $(this).parent()
        $("#list_completed").prepend(completedItem);
        $(completedItem).css('color', getRandomColor());
});

$("#list_completed").on('click', "button", function() {
        // move back from list_completed container to list_todo container
        $(this).html("Finally! Add to Completed List");
        var todoItem = $(this).parent()
        $("#list_todo").prepend(todoItem);
        $(todoItem).css('color', 'red');

});
