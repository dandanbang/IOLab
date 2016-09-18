
$( document ).ready(function(){
    console.log("ready!");
    var count = 0, count2 = 0;
    $("#poke").click(function() {
        console.log("clicked");
        count+=1;
        $("#counter").html(count);
    });
    $("#poke2").click(function() {
        console.log("clicked2");
        count2+=1;
        $("#counter2").html(count2);
    });
});

