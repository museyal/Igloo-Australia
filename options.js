/**
 * @author Umar
 */

var strength, text, choice;


 $(function() {
    $("#slider").slider({min: 0,
    	 max: 10, 
    	 step: 1, 
    	 slide: function( event, ui ) {
          	//$( "#sval" ).val( ui.value );
         	 $("#sval").html("Blur Strength: "+(ui.value*10)+"%");
      		}});
    $("#slider").slider("disable");
    var s = $("#slider").slider("value");
    
  });
  
window.onload = addListeners;

function addListeners(){
	$('input:radio').click(function(){
		var i = $(this).attr("id");
		
		switch(i){
			case "CSS-Blur":
				$("#slider").slider("enable");
				$("#Trash-Image").prop('checked', false);
				break;
			case "Trash-Image":
				$("#CSS-Blur").prop('checked', false);
				$("#slider").slider("disable");
				break;
			default:
				break;
		}
	});
	
	
	$("#submit").click(function(){
		if(($("input").is(":checked")) && ($('#IggyToVar').val().length > 0)){
				text = $('#IggyToVar').val();
			strength = $('#slider').slider("value");
			choice = $('input:checked').val();
			
			chrome.storage.sync.set({'Substitute': text,'Blur_Strength': strength, 'Choice': choice});
	
			alert("Success! =) \n\nPlease refresh your tabs to see the changes.");
	
		}
		else if((!$("input").is(":checked")) && ($('#IggyToVar').val().length <= 0)){
			alert("                           ಠ_ಠ \n\nYou left all the fields blank, ya dingus!.");
		}
		else if(!$("input").is(":checked")){
			alert("Please select one of the options.");
		}
		else if($('#IggyToVar').val().length <= 0){
			alert("Please enter something in the textfield.");
		}
	});
}