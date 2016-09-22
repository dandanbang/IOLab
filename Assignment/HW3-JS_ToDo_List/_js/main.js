$(document).ready(
    $(document).on('click', "button.new-item", function() {
        // once the document loads, create new item with this function
        var user_input = $('.todo-item-input').val();
        var thisListID = $(this).closest('.list').attr("id")
        $("#"+thisListID+" .list_todo").prepend("<li> <button class='move-complete'> <img src='complete.png'> </button>" + user_input + "</li>");
    })
);

var listCount = 0;
var activeListCount = 0;

    $("#new-list").on('click', function() {
        if (activeListCount < 10){
            $('#blank-list').clone()
                .removeAttr('id', 'blank-list')
                .addClass('list')
                .attr('id', 'list'+listCount)
                .prependTo('#lists');

            listCount++;
            activeListCount++;
        }
    });

    $(document).on('click', "button.move-complete", function() {   
        // move from list_todo container to list_completed container
        $(this).html("<img src='repeat.png'>");
        $(this).removeClass('move-complete').addClass('move-start');
        var completedItem = $(this).parent()
        var thisListID = $(this).closest('.list').attr("id")
        $("#"+thisListID+" .list_completed").prepend(completedItem);
    });
    

    $(document).on('click', "button.move-start", function() {
        // move from list_todo container to list_completed container
        $(this).removeClass('move-start').addClass('move-complete');
        $(this).html("<img src='complete.png'>");
        
        var completedItem = $(this).parent()
        var thisListID = $(this).closest('.list').attr("id")
        $("#"+thisListID+" .list_todo").prepend(completedItem);
    });

    $(document).on('click', "button.delete", function() {
        // move from list_todo container to list_completed container
        var thisListID = $(this).closest('.list').attr("id")
        $("#"+thisListID).remove();
        activeListCount--;
    });




