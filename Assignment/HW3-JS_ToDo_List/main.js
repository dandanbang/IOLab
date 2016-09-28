$(document).ready(function() {
    $("#new-item").on('click', function() {
        // once the document loads, 
        // create new item with this function
        $("#header1").animate({marginLeft: "+=400px"});//animation for moving the header left to right
        $("#header1").animate({marginLeft: "-=400px"});//animation for moving the header right to left
         var todo_input = $("input").val();
        $("#to-do").prepend('<li>'+"  " +todo_input+ "  " + '<button> Mark as completed? </button></li>');
        $("#to-do").animate({fontSize: '2em'}, "slow");
        $("#to-do").animate({fontSize: '1em'}, "slow");
    });


    $("#to-do").on('click', "button", function() {
        // move from list_todo container to 
        // list_completed container
        $("#header2").animate({marginLeft: "+=400px"});//animation for moving the header left to right
        $("#header2").animate({marginLeft: "-=400px"});//animation for moving the header right to left
        $(this).html("Unmark as Complete");
        var completed = $(this).parent();
        $("#completed").prepend(completed);
        $("#completed").animate({fontSize: '2em'}, "slow");
        $("#completed").animate({fontSize: '1em'}, "slow");

    });

    $("#list_completed").on('click', "button", function() {
        // move back from list_completed container to 
        // list_todo container
        $("#header2").animate({marginLeft: "+=400px"}); //animation for moving header2 from left to right
        $("#header2").animate({marginLeft: "-=400px"});//animation for moving header2 from right to left
        $("#header1").animate({marginLeft: "+=400px"});//animation for moving the header1 left to right
        $("#header1").animate({marginLeft: "-=400px"});//animation for moving header2 from right to left
        $(this).html("completed?");
        var doAgain = $(this).parent();
        $("#to-do").prepend(doAgain);

    });
});

