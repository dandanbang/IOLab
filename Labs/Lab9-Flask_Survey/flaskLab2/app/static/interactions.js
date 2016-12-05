$('#submit-survey').on('click', function submitSurvey() {
	var color = $("input[name=color]").val();
	var food = $("input[name=food]").val();
	var vacation = $("input[name=vacation]").val();
	var ioLab = $("input[name=time-io-lab]").val();
	var otherWork = $("input[name=time-other-work]").val();
	var commute = $("input[name=time-commute]").val();
	var relax = $("input[name=time-relax]").val();
	var feBefore = $("input[name=front-end-before]").val();
	var feAfter = $("input[name=front-end-after]").val();
	$.post("submit-survey",
		{color: color,
		food: food,
		vacation: vacation,
		ioLab: ioLab,
		otherWork: otherWork,
		commute: commute,
		relax: relax,
		feBefore: feBefore,
		feAfter: feAfter},
		function(data) {
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

	currentValue = $("#t-io-lab").val();
	$("#t-io-lab").next().html(currentValue);

	currentValue = $("#t-other-work").val();
	$("#t-other-work").next().html(currentValue);

	currentValue = $("#t-commute").val();
	$("#t-commute").next().html(currentValue);

	currentValue = $("#t-relax").val();
	$("#t-relax").next().html(currentValue);
});


$("input[type='range']").on('change', function updateLabel() {
	var currentValue = $(this).val();
	$(this).next().html(currentValue);
});