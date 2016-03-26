// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(sender.tab ?
//                 "from a content script:" + sender.tab.url :
//                 "from the extension");
//     if (request.greeting == "hello")
//       sendResponse({farewell: "goodbye"});
//   });


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	console.log(request);
  	var video = $("video")[0];
  	var myInterval;
  	if(request.action == "getInfo"){
  		if($(video).prop('data-repeat') == true){
  			sendResponse({action:"getInfo",repeat: true})
  		}
  		else{
  			sendResponse({action:"getInfo",repeat: false});
  		}
  	}

  	if(request.action == "toggle_video_status"){

	  	if(video){
	  		if(video.paused){
	  			video.play();
	  			sendResponse({action:'toggle_video',success:1,status:"play"})
	  		}
	  		else{
	  		video.pause();
	  			sendResponse({action:'toggle_video',success:1,status:"pause"})
	  		}
	  	} 
	  	sendResponse({action:'toggle_video',success:1})
  	}
  	if(request.action == "repeat"){
  		console.log(request.repeat);
  		if(video){
  			request.repeat ? $(video).prop('data-repeat',true) : $(video).prop('data-repeat',false);
  			// console.log($(video).prop('data-repeat'));	
  			if($(video).prop('data-repeat')){
  				setInterval(function(){
					console.log('sprawdzam');
					if(video.ended){
						video.play();
					}
			},500);
	  		} else{
		  		for (var i = 1; i < 99999; i++)
	       			window.clearInterval(i);
	  		}
	 	}
  	}
  
  });