// custom javascript
$(document).on("click", ".btn-danger", function(){
    $(this.parentNode.parentNode).remove();
    trip_name = $(this.parentNode).next().text();
    trip_destination = $(this.parentNode).next().next().text();
    $.post( "http://0.0.0.0:8001/deletetrip",
            { trip_name: trip_name, trip_destination: trip_destination},
            function(data) {
                if (data['status'] == 200) {
                    alert("Trip deleted.")
                } else {
                    alert("Error.")
                }
});
});
