/**
 * @author Umar
 */

chrome.runtime.onMessage.addListener(function(response,sender,sendResponse){
	
	if(response == 'reloadtab'){
		chrome.tabs.reload();
	}
	
});

chrome.runtime.onMessage.addListener(function(message,sender){
	
	if(message == "StartOrNot"){

		chrome.storage.sync.get('Enabled', function(data){
			switch(data.Enabled){
				case "Turned OFF":
					chrome.tabs.sendMessage(sender.tab.id,"OFF");
					break;
				case 'Turned ON':
					chrome.tabs.sendMessage(sender.tab.id,"ON");
					break;	
			}
		});
		
		
	}
});