$(document).ready(
    $("#new-item").on('click', function() {
        text = $("input")[0].value; //Get input value
        // Check input length without space
        if ( $.trim(text).length == 0) {
            alert("You must enter some text");
            return;
        }
        button = '<button id="todos">completed</button>';
        text_list = "<li>" + text + button + "</li>";
        $("#list_todo .lists ul").prepend(text_list);
        $("input")[0].value = "";

 // once the document loads, create new item with this function
    })
);

$("#list_todo").on('click', "button", function() {
    // move from list_todo container to list_completed container
    $("#list_completed .lists ul").prepend(this.parentNode);
    $("#list_completed .lists button").text("TODO");


});
//
$("#list_completed").on('click', "button", function() {
        // move back from list_completed container to list_todo container
    $("#list_todo .lists ul").prepend(this.parentNode);
    $("#list_todo .lists button").text("Completed");

});

function changestyle() {

}
