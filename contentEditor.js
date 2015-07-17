/**
 * @author Umar
 */
var running, strength, text, choice;
var keywords = [];
var regexses = [];
var encryptedURLs = [];

//firstRunCheck(); //Unfinished method that will be added in the upcoming updates.
//updateCheck();	 //Unfinished method that will be added in the upcoming updates.

initialCheck();	//Runs the initialCheck method as first thing on page refresh
updateArrays(regexses,keywords);	//Adds values to the regex array and keywords array

/**
 * Reads value from the popup.js to check if the extension must be turned on or off.
 */
function initialCheck(){
	
	/*I forgot I could've used this
	chrome.storage.sync.get('Enabled', function(data){
		alert(data.Enabled);	
	});*/
	
	chrome.runtime.sendMessage("StartOrNot");

	chrome.runtime.onMessage.addListener(function(msg){
	
	switch(msg){
		case "OFF":
			running = false;
			break;
		case "ON":
			running = true;
			break;
		}
	});
	chrome.storage.sync.get('Blur_Strength', function(data){
		strength = data.Blur_Strength;
	});
	chrome.storage.sync.get('Choice', function(data){
		choice = data.Choice;
	});
	chrome.storage.sync.get('Substitute', function(data){
		text = data.Substitute;
	});
}


/*
 * Injects the following code after DOM tree has been established
 */
$(document).ready(function(){
	var html = $(document).text();
	
	switch(running){
		
		case true:
			if(containsIggy(regexses)){		//Detects the Iggy presence in the page
				updateImages(getsImages());
				walk(document.body);
				
				}
			else{}
			break;
		
		case false:
			//alert("Please Refresh your Tab to clear the trashiness");
			break;
	}
});

/**
 * Populates the Regex and Keywords Array & Uses Performance Enhanced For-loops
 * @param {Object} array
 * @param {Object} array
 */
function updateArrays(reg,hot){
	const ia = "Iggy Azalea";
	const aak = "Amethyst Amelia Kelly";
	const ai = "Nick Young";
	var temp = [];
	
	temp = [
			ia, ia.substring(0,4), ia.substring(5,12),
			aak, aak.substring(0,7), aak.substring(9,15), aak.substring(16,21),
			ai, ai.substring(0,4), ai.substring(5,10)
			];
	
	//Adds values to the hotwords array
	for(i in temp){
		hot[i] = temp[i];
	}
	//Adds Regex Value based on the keywords
	for(j in hot){
		reg[j] = new RegExp("(?:"+hot[j]+")", "gi");
	}
	
	reg[reg.length] = new RegExp("(?:encrypted)","gi");
}

/**
 * Checks if the page contains iggy
 * @param {Object} arr
 */
function containsIggy(arr){
	var html = $(document).text();
	for(key in arr){
		if(arr[key].test(html)){
			return true;
			break;
		}
		else{
			return false;
			break;
		}
	}
}

/************************************* Start of Text Replacing Script ****************************************************/

/**
 * Walker function that I stole from here:
 * http://stackoverflow.com/a/5904945
 * 
 * @param {Object} node
 */
function walk(node) 
{
	var child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode){
	for(var i=0,j=regexses.length; i<j; i++){
		//textNode.nodeValue = textNode.nodeValue.replace(regexses[i], "Igloo Australia");
		textNode.nodeValue = textNode.nodeValue.replace(regexses[i], text);
	};
}

/************************************* End of Text Replacing Script ****************************************************/

function getsImages(){
	var src = [];
	var alt = [];
	var tit = [];
	var lde = [];
	var idd = [];
	var cls = [];
	
	$("img").each(function(){
		
		src[src.length] = $(this).attr("src");
		alt[alt.length] = $(this).attr("alt");
		tit[tit.length] = $(this).attr("title");
		lde[lde.length] = $(this).attr("longdesc");
		idd[idd.length] = $(this).attr("id");
		cls[cls.length] = $(this).attr("class");
	});
	
	alt[alt.length] = "Image for the news result";
	//console.log({Sources: src, Alternate_Text: alt, Title: tit, Long_Destination: lde, ID: idd, Class: cls});
	
	return {Sources: src, Alternate_Text: alt, Title: tit, Long_Destination: lde, ID: idd, Class: cls};
}

function updateImages(obj){
	var img2chg_src = [];
	var img2chg_tit = [];
	var img2chg_alt = [];
	var img2chg_lde = [];
	var img2chg_idd = [];
	var img2chg_cls = [];
	var img2chg = {};
	
	for (i in obj.Sources){
		for(j in regexses){
			 if(regexses[j].test(obj.Alternate_Text[i]) ||
				regexses[j].test(obj.Long_Destination[i]) ||
				regexses[j].test(obj.Sources[i]) ||
				regexses[j].test(obj.Title[i])||
				regexses[j].test(obj.ID[i]) ||
				regexses[j].test(obj.Class[i])){
					
				img2chg_src[img2chg_src.length] = obj.Sources[i];
				img2chg_tit[img2chg_tit.length] = obj.Title[i];
				img2chg_alt[img2chg_alt.length] = obj.Alternate_Text[i];
				img2chg_lde[img2chg_lde.length] = obj.Long_Destination[i];
				img2chg_idd[img2chg_idd.length] = obj.ID[i];
				img2chg_cls[img2chg_cls.length] = obj.Class[i];
				
			}
		}
	};
	
	img2chg = {Sources: img2chg_src, Alternate_Text: img2chg_alt, Title: img2chg_tit, Long_Destination: img2chg_lde, ID: img2chg_idd, Class: img2chg_cls};

		$("img").each(function(){
			for(m in img2chg.Sources){			
			 if(($(this).attr("src") == img2chg.Sources[m]) || 
				($(this).attr("alt") == img2chg.Alternate_Text[m])){
				
				if(choice == "Blur Iggy's Images"){
					$(this).css({'-webkit-filter' : 'blur('+strength+'px)'});
				}
				else if(choice == "Replace with picture of Trash"){
					$(this).css({'content':'url("https://i.imgur.com/auTIhxQ.gif")'});
				//$(this).attr({"alt": "Trash", "title": "Trash", "src": "https://i.imgur.com/auTIhxQ.gif"});
				}
				}
			}
		});
}