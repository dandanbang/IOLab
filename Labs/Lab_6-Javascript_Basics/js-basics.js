	$( document ).ready(function() {
		var tags = new Array();
		var count = new Array();
		for (var i = 0; i < 6; i++) {
			tags[i] = document.getElementsByClassName("ib-grid-item")[i].getElementsByTagName('p')[2];
			count[i] = 1;
		}
		//  	var count = document.getElementsByClassName("steve-img")[0].getElementsByTagName('p')[2];
		$(".steve-img").click(function() {
			tags[0].innerHTML = count[0]++  ;
		});
		$(".franklin-img").click(function() {
			tags[1].innerHTML = count[1]++  ;
		});
		$(".lickums-img").click(function() {
			tags[2].innerHTML = count[2]++  ;
		});
		$(".roxanne-img").click(function() {
			tags[3].innerHTML = count[3]++  ;
		});
		$(".felix-img").click(function() {
			tags[4].innerHTML = count[4]++  ;
		});
		$(".bubbles-img").click(function() {
			tags[5].innerHTML = count[5]++  ;
		});
});
