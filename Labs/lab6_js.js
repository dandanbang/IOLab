var cat1_clicks = 0;
var cat2_clicks = 0;
var cat3_clicks = 0;
var cat4_clicks = 0;
var cat5_clicks = 0;

$( document ).ready(function() {
	$( "cat")
	$( "#cat1_img" ).click(function() {
		cat1_clicks++;
		$ ( "#cat1_clicks" ).html(cat1_clicks)
	});
	$("#cat2_img").click(function() {
		cat2_clicks++;
		$("#cat2_clicks").html(cat2_clicks)
	});
	$("#cat3_img").click(function() {
		cat3_clicks++;
		$("#cat3_clicks").html(cat3_clicks)
	});
	$("#cat4_img").click(function() {
		cat4_clicks++;
		$("#cat4_clicks").html(cat4_clicks)
	});
	$("#cat5_img").click(function() {
		cat5_clicks++;
		$("#cat5_clicks").html(cat5_clicks)
	});
});

