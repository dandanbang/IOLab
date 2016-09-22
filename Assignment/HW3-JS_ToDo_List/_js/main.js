$(document).ready(
    $(".new-item").on('click', function() {
        console.log("haiiii");
        // once the document loads, create new item with this function
        var user_input = $('.todo-item-input').val();
        // alert(user_input);
        $('.list_todo').prepend("<li> <button> <img src='complete.png'> </button>" + user_input + "</li>");
    })
);

    $(".list_todo").on('click', "button", function() {
        // move from list_todo container to list_completed container
        $(this).html("<img src='repeat.png'>");
        var completedItem = $(this).parent()
        $(".list_completed").prepend(completedItem);
    });
    

    $('.list_completed').on('click', "button", function(){
        $(this).html("<img src='complete.png'>");
        var completedItem = $(this).parent()
        $(".list_todo").prepend(completedItem);
    });



