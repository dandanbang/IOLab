// $ ('.doggy').on("click","a,img", function (e) {
//       e.preventDefault();
//       alert('You Clicked Me');
//  });


// <script type="text/javascript"> //Added new `<script>` tag
  function addClicks(a, i){
  	$(a).html(i + " clicks")
  } 

  $(document).ready(

  	function() {
	//added missing-v quotes 
	i = 0;
	j = 0;
	$('.doggy').click(function() {
	   i++;
	   addClicks('.doggy-counter', i)     
	});
	$('.sad-dog').click(function() {
	   j++;
	   addClicks('.sad-counter', j)   
	});    
  } );  

// </script>