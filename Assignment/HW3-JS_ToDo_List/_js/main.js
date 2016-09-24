$(document).ready(function() {
    console.log("Ready!");
    $("#new-item").on('click', function() {
        // once the document loads, 
        // create new item with this function
        var inputValue = $("input").val();
        $("#to-do").prepend('<li><button> Finished? </button>'+inputValue+'</li>');
    });


    $("#list_todo").on('click', "button", function() {
        // move from list_todo container to 
        // list_completed container
        $(this).html("Not finished?");
        var completed = $(this).parent();
        completed.css("color","Grey");
        completed.css("font-style","italic");
        $("#complete").prepend(completed);

    });

    $("#list_completed").on('click', "button", function() {
        // move back from list_completed container to 
        // list_todo container
        $(this).html("Finished?");
        var stilldo = $(this).parent();
        stilldo.css("color", "black");
        stilldo.css("font-style", "normal");
        $("#to-do").prepend(stilldo);

    });
});


