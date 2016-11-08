// $(document).ready(function () {
	$(document).on('click', '#delete-trip', function () {
		// $(this.parentNode.parentNode).remove();
		trip_name = $(this).parent().prev().prev().text();
		destination = $(this).parent().prev().text();
		// alert(destination);
		$(this).parent().parent().remove();
		$.post("http://0.0.0.0:8081/delete_trip",
			{
			trip_name: trip_name,
			destination: destination
			}, 
			function(data) {
				if (data == "ok") {
                   alert("Trip deleted.")
              } else {
                   alert("Error.")
              }
              }
		);
	});
// });