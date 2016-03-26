var port = chrome.extension.connect({name: "Sample Communication"});
var info = [];
var matchUrl = '*://www.youtube.com/watch?v*';
chrome.tabs.query({url: matchUrl}, function(tabs) {   
 // console.log(tabs);
  $.each(tabs,function(i,v){
    chrome.tabs.sendMessage(v.id, {'action' : "getInfo"},function(response){
      console.log(response);
      if(response.action == 'getInfo'){
                  info.push({id:v.id,
                  title:v.title,
                  audible:v.audible,
                  repeat: response.repeat});

        $status = v.audible ? "<a class='status' data-status='play'><img src='pause.png'/></a>" : "<a class='status' data-status='pause'><img src='play.png'/></a>";
        $repeat = response.repeat ? "<input name='repeat' class='repeat' checked type='checkbox'>" : "<input name='repeat' class='repeat' type='checkbox'>";

        var  div = "<div id='"+v.id+"' class='item'> "+$status+" <span class='tab-id' data-id='"+v.id+"'>"+v.title+"</span><label>Powtarzaj"+$repeat+"</label></div><hr>";
        $("#content-list").append(div);
      }
  })
          
  })
});

$(document).on("click",".status",function(){
    var tabId = $(this).siblings(".tab-id").attr('data-id');
    var status = $(this).prop("data-status");
   
    chrome.tabs.sendMessage(parseInt(tabId), {'action' : "toggle_video_status",id:tabId, status:status},function(response){
      if(response.success == 1){
         if(response.status == "play"){

          // console.log($("#"+tabId).find("img"));
            $("#"+tabId).find('img').prop("src","pause.png");
            $("#"+tabId).find(".status").prop("data-status","pause");
        }
        else if(response.status == "pause"){
            $("#"+tabId).find('img').prop("src","play.png");
            $("#"+tabId).find(".status").prop("data-status","play");
        }
      }
    });
})

$(document).on("change",'.repeat',function(){
  var checked = $(this).prop('checked');
  $(".repeat").prop("checked",false);
  $(this).prop("checked",checked);
 
 $(".repeat").each(function(i,v){
    var status = $(v).prop("checked");
    var tabId = $(v).parent().siblings(".tab-id").attr('data-id');
    port.postMessage({action:'repeat',id:parseInt(tabId), repeat:status});
 });

})
