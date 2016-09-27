$( document ).ready(function() {
  console.log( "ready!");
  var count = document.getElementsByTagName('p')[1];
  var count2 = document.getElementsByTagName('p')[3];
  var i = 1;
  var j = 1;
  $(".1").click(function() {
      count.innerHTML = i++;
});
  $(".2").click(function() {
      count2.innerHTML = j++;
});
});