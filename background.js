// dealWithTabs()

// chrome.tabs.onCreated.addListener(function(){
//   console.log('create');
//   dealWithTabs();
// })

// chrome.tabs.onUpdated.addListener(function(){
//   console.log('updae');
//   dealWithTabs();
// })

// chrome.tabs.onRemoved.addListener(function(){
//   console.log('remove');
//   dealWithTabs();
// })

  // function dealWithTabs(){
  
  // }


chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
      console.log(msg);
      if(msg.action == "repeat"){
        console.log('test');
        // setInterval(function(){
            chrome.tabs.sendMessage(parseInt(msg.id), {action:'repeat', repeat: msg.repeat}, function(response) {
                // console.log('Start action sent');
            });
        // },500);
      }
    });
      });