$('#submit-survey').on('click', function submitSurvey() {
	var gender = $("input[name=gender]").val();
	var color = $("input[name=color]").val();
	var food = $("input[name=food]").val();
	var vacation = $("input[name=vacation]").val();
	var ISchoolClass = $("input[name=ISchoolClass]").val();
	var feBefore = $("input[name=front-end-before]").val();
	var feAfter = $("input[name=front-end-after]").val();
		$.post("submit-survey",
		{
		gender: gender,
		color: color,
		food: food,
		vacation: vacation,
		ISchoolClass: ISchoolClass,
		feBefore: feBefore,
		feAfter: feAfter},
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
	var currentValue = $("#fe-before").val();
	$("#fe-before").next().html(currentValue);

	currentValue = $("#fe-after").val();
	$("#fe-after").next().html(currentValue);
});


$("input[type='range']").on('change', function updateLabel() {
	var currentValue = $(this).val();
	$(this).next().html(currentValue);
});