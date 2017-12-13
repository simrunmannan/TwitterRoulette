$( document ).ready(function() {
    console.log( "ready!" );

    function onNewContent() {
         $("#screen").scrollTop($("#screen-text").height());
      }
    	function randomIntFromInterval(min,max)
	{
	    return Math.floor(Math.random()*(max-min+1)+min);
	}

	//writing function
	function typeWrite(span){

	  $('#'+ span).addClass('cursor')
	  var text = $('#'+ span).text();
	  var randInt = 0
	  for (var i = 0; i < text.length; i++) {
	    randInt += parseInt(randomIntFromInterval(0,40));
	    var typing = setTimeout(function(y){
	      $('#'+span).append(text.charAt(y));
	    },randInt, i);
	  };
	  setTimeout(function(){
	    $('#'+span).removeClass('cursor');
	  },randInt+250);
	}

	typeWrite('welcome');
    typeWrite("screen-text2");

$('#ledon-button').click(function() {
	
	typeWrite('screen-text');
	onNewContent();

    $.ajax({
        type: 'POST',
        url: 'http://localhost:1337/LEDon'
    });
});
});
