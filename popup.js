import { getActiveTab } from "./utils.js"; 

const addNewBookmark = (bookmarkem,b) =>{
    // console.log()
    const bookmarkTitleElement = document.createElement("div");
    const controlsElement = document.createElement("div");
    const newBookmarkElement = document.createElement("div");
  
    bookmarkTitleElement.textContent = b.desc;
    bookmarkTitleElement.className = "bookmark-title";
    controlsElement.className = "bookmark-controls";
  
    // setBookmarkAttributes("play", onPlay, controlsElement);
    // setBookmarkAttributes("delete", onDelete, controlsElement);
  
    newBookmarkElement.id = "bookmark-" + b.time;
    newBookmarkElement.className = "bookmark";
    newBookmarkElement.setAttribute("timestamp", b.time);
  
    newBookmarkElement.appendChild(bookmarkTitleElement);
    newBookmarkElement.appendChild(controlsElement);
    bookmarkem.appendChild(newBookmarkElement);
};  

const viewBookmarks = (currentBookmarks=[]) =>{
    const bookmarkem = document.getElementById("bookmarks");
    bookmarkem.innerHTML= "" ;

    if(currentBookmarks.length>0){
        // alert(12)
        currentBookmarks.map((b,i)=>{
            addNewBookmark(bookmarkem,b)
        })
    }
    else{
        bookmarkem.innerHTML ="<i class='row'>No bookmarks to display</i>"
    }
};
const onPlay = e =>{};
const onDelete = e =>{};
const setBookmarkAttributes=  () => {};
document.addEventListener("DOMContentLoaded",async () => {
    const activeTab = await getActiveTab();
    const queryParams = activeTab.url.split("?")[1];
    const urlParams = new URLSearchParams(queryParams);

    const currentVideo = urlParams.get("v");

    if(activeTab.url.includes("youtube.com/watch") && currentVideo){
        // alert(123)
        chrome.storage.sync.get([currentVideo],(data)=>{
            const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]) : [];
            // console.log('curr',currentVideoBookmarks)
            viewBookmarks(currentVideoBookmarks)
        })
    }
    else{
        const container = document.getElementsByClassName("container")[0];

        container.innerHTML = '<div class="title"> This is not a youtube video </div>'
    }
});
