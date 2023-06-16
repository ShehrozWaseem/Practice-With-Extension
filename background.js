//letting extension know we navigates on a new page
//listen to tab changes"
//find any activity on the tab
// import ""
// console.log("bg . js")
chrome.tabs.onUpdated.addListener((tabId,changeInfo,tab)=>{
  // console.log("url---",tab)
  if(tab.url && tab.url.includes("youtube.com/watch")){
    // console.log("url---",tab)
    const queryParams = tab.url.split("?")[1];
    const urlParams = new URLSearchParams(queryParams);
    //send message to content script.js
    //take tabs id,obj,
    //and a call back func
    chrome.tabs.sendMessage(tabId,{
      
      type:"NEW",
      videoId: urlParams.get("v"),
    });
  }
})