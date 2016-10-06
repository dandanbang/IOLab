
// grab data when button is clicked
$('#submit-survey').on('click', function submitSurvey() {
	var bones = $("input[name=bones]").val();
	var walk = $("input[name=walk]").val();
	var kanye = $("input[name=kanye]").val();
	var vacation = $("input[name=vacation]").val();
	var cookBefore = $("input[name=cooking-before]").val();
	var cookAfter = $("input[name=cooking-after]").val();
	$.post("submit-survey",
	{bones:bones,
		walk:walk,
		kanye:kanye,
		vacation:vacation,
		cookBefore:cookBefore,
		cookAfter:cookAfter},
		function(data) {
			$("html").html(data);
		})
});

$("#results-email-container").on('click', '#email-results-button', function emailResults() {
	console.log($(this));
});

$("#site-title-wrapper").on('click', function goHome() {
	window.location.href = '/';
});

$(document).ready(function applySliderLabels() {
	var currentValue = $("#cook-before").val();
	$("#cook-before").next().html(currentValue);

	currentValue = $("#cook-after").val();
	$("#cook-after").next().html(currentValue);
});


$("input[type='range']").on('change', function updateLabel() {
	var currentValue = $(this).val();
	$(this).next().html(currentValue);
});