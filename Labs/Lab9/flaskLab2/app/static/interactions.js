$('#submit-survey').on('click', function submitSurvey() {
	var background = $("input[name=background]").val();
	var language = $("input[name=language]").val();
	var course = $("input[name=course]").val();
	var feBefore = $("input[name=front-end-before]").val();
	var feAfter = $("input[name=front-end-after]").val();
	$.post("submit-survey",
	{background: background,
	  language: language,
	  course: course,
	  feBefore: feBefore,
	  feAfter: feAfter},
	  function(data) {
	  	$("html").html(data);
	  });
});

$("#results-email-container").on('click', '#email-results-button', function emailResults() {
	$.post("/send_email", 
		{
			"destination_email": $("#visitor-email").val()
		},
		function response(data) {
			$("#results-email-container").html(data.statusMsg)
		},
		"json"
	)

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