$('#submit-survey').on('click', function submitSurvey() {
	var classmate = $("input[name=classmate]").val();
	var goal = $("input[name=goal]").val();
	var hour = $("input[name=hour]").val();
	var grade = $("input[name=grade]").val();
	var day_score = $("input[name=day_score]").val();
	
	// AJAX code, but he recommend using the FORM
	$.post("submit-survey",
		{classmate: classmate,
			goal:goal,
			hour:hour,
			grade:grade,
			day_score, day_score},
			function(data){
				$("html").html(data);
			})
	// }
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