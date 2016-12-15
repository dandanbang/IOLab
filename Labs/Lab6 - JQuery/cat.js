// function myfunction() {
// 	var count = parseInt(document.getElementById("span1").innerText);
// 	count = count + 1;
//     document.getElementById("span1").innerText = count;
// }

$("#cat_img").click(function(){
	var count = parseInt(document.getElementById("span1").innerText);
	count = count + 1;
	document.getElementById("span1").innerText = count;
});

$("#cat_img2").click(function(){
	var count = parseInt(document.getElementById("span2").innerText);
	count = count + 1;
	document.getElementById("span2").innerText = count;
});

$("#cat_img3").click(function(){
	var count = parseInt(document.getElementById("span3").innerText);
	count = count + 1;
	document.getElementById("span3").innerText = count;
});

$("#cat_img4").click(function(){
	var count = parseInt(document.getElementById("span4").innerText);
	count = count + 1;
	document.getElementById("span4").innerText = count;
});

$("#button_1").click(function(){
	$("#div1").show();
	$("#div2").hide();
	$("#div3").hide();
	$("#div4").hide();
});

$("#button_2").click(function(){
	$("#div1").hide();
	$("#div2").show();
	$("#div3").hide();
	$("#div4").hide();
});

$("#button_3").click(function(){
	$("#div1").hide();
	$("#div2").hide();
	$("#div3").show();
	$("#div4").hide();
});

$("#button_4").click(function(){
	$("#div1").hide();
	$("#div2").hide();
	$("#div3").hide();
	$("#div4").show();
});