var n = 0;

$(document).ready(
    $("#btnNewItem").on('click', function() {
        // once the document loads, create new item with this function
        
        n = n + 1;
        var toDoItem = $('#txtToDoItem').val();

        $('#ul_todo').prepend("<li id='li_"+n+"'> <button value='li_"+n+"'> Move Me to Completed</button>"+toDoItem+"</li>")
        $('#txtToDoItem').val('');
 
    })
);

$("#list_todo").on('click', "button", function() {
        // move from list_todo container to list_completed container

        $(this).remove();
        var toDoItem = $(this).val();
        var txtToDoItem = $('#'+$(this).val()).text();
        $('#'+toDoItem).remove();

        $('#ul_complete').prepend("<li id='"+toDoItem+"'> <button value='"+toDoItem+"'> Return to To Do</button>"+txtToDoItem+"</li>")
});

$("#list_completed").on('click', "button", function() {
        // move back from list_completed container to list_todo container
        $(this).remove();
        var toDoItem = $(this).val();
        var txtToDoItem = $('#'+$(this).val()).text();
        $('#'+toDoItem).remove();

        $('#ul_todo').prepend("<li id='"+toDoItem+"'> <button value='"+toDoItem+"'> Move Me to Completed</button>"+txtToDoItem+"</li>")
});