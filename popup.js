/**
 * @author Umar
 */

window.onload = addListeners;
var globalval, firstRun = true;

/**
 * Initially runs and reads the state of the extension
 */
$(document).ready(function(){
chrome.storage.sync.get('Enabled', function(item){
	globalval = item.Enabled;
	init_testing(globalval);
});
});

function addListeners(){
	document.getElementById('options').addEventListener("click", optionsPage, false);	
	document.getElementById('btn').addEventListener("click", test, false);
}

/**
 * Opens new Options Page
 */
function optionsPage(){
	chrome.tabs.create({url: chrome.extension.getURL('options.html')});
} 

/**
 * Switches the Text to Turned Off and On, and stores the value in chrome.storage
 */
function test(){
	testing(globalval);
	writing(globalval);
	chrome.storage.sync.set({'Enabled': globalval, 'Blur_Strength': 5, 'Choice': "Blur Iggy's Images", 'Substitute': "Igloo Australia"});
}

function init_testing(text){
	switch(text){
		case "Turned OFF":
			globalval = "Turned OFF";
			break;
		case 'Turned ON':
			globalval = "Turned ON";
			break;
	}
	$('#btn').text(globalval);
}


function testing(text){
	switch(text){
		case "Turned OFF":
			globalval = "Turned ON";
			chrome.tts.speak("Turned On.", { enqueue: true, volume: 1.0});
			chrome.tabs.reload();
			break;
		case 'Turned ON':
			globalval = "Turned OFF";
			chrome.tts.speak("Turned Off.", {enqueue: true, volume: 1.0});
			chrome.tabs.reload();
			break;
		default:
			globalval = "Turned OFF";
			break;
	}
}

function writing(text){
	$("#btn").text(text);
}
