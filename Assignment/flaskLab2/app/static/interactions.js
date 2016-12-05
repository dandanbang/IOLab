$('#submit-survey').on('click', function submitSurvey() {
	var animal = $("input[name=animal]").val();
	var shop = $("input[name=shop]").val();
	var timemachine = $("input[name=timemachine]").val();
	var movie = $("input[name=movie]").val();
	var feBefore = $("input[name=front-end-before]").val();
	var feAfter = $("input[name=front-end-after]").val();
	/*5c. Create a $.post() Ajax request within this ‘click’ event handler*/
	/*5c.i. The url for this Ajax request should point to ‘submit-survey’*/
	/*5c.ii. The data parameter of this Ajax request should be an object whose 
	key-value pairs correspond to the variables for each form input field*/
	$.post("submit-survey",
		{animal:animal,
			shop:shop,
			timemachine:timemachine,
			movie:movie,
			feBefore:feBefore,
			feAfter:feAfter},
			function(data){
				$("html").html(data);
			});
});

$("#results-email-container").on('click', '#email-results-button', function emailResults() {
	console.log($(this));
});

$("#site-title-wrapper").on('click', function goHome() {
	window.location.href = '/';
});

$(document).ready(function applySliderLabels() {
	var currentValue = $("#fe-before").val();
	$("#fe-before").next().html(currentValue);

	currentValue = $("#fe-after").val();
	$("#fe-after").next().html(currentValue);
});


$("input[type='range']").on('change', function updateLabel() {
	var currentValue = $(this).val();
	$(this).next().html(currentValue);
});