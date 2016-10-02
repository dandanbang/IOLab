$('#submit-survey').on('click', function submitSurvey() {
	var color = $("input[name=color]").val();
	var food = $("input[name=food]").val();
	var vacation = $("input[name=vacation]").val();
	var orgBefore = $("input[name=org-before]").val();
	var orgAfter = $("input[name=org-after]").val();

	console.log(orgAfter, orgBefore);
	$.post('submit-survey',{
		color: color,
		food: food,
		vacation: vacation,
		orgBefore: orgBefore,
		orgAfter: orgAfter},
		function(data){
			$('html').html(data);
		}
	);
});

$("#results-email-container").on('click', '#email-results-button', function emailResults() {
	var emailContent = $(this).attr('href');
	var emailString = String(emailContent);
	var idx = emailString.indexOf("body=");

	// parse out the first part of the string
	var email = emailString.substring(0, idx);

	// get body content
	idx = idx + "body=".length;
	var body = emailString.substring(idx).replace(/\'/g, '"');
	body = jQuery.parseJSON(body);

	// format body content
	var bodyContent = "";
	$.each(body, function(k, v){
		bodyContent = bodyContent + k + ": " + v + "%0A";
	});

	// reconstruct email string
	email = email + "body=" + bodyContent;
	window.open(email);
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
