//adding button on yt
//manipulate dom of page where we are so we'll write contentScript.js

(()=>{
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";
    let currentVideoBookmarks = [];

    //listen to the msg fr om bg.js
    chrome.runtime.onMessage.addListener((obj,sender,response)=> {
        const {type, value, videoId} = obj;

        if(type === "NEW"){
           currentVideo = videoId;
           newVideoLoaded()  
        }
    })

    const fetchBookmarks = () => {
        return new Promise((resolve)=>{
            chrome.storage.sync.get([currentVideo],(obj)=>{
                resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : [])
            })
        })
    }

    const newVideoLoaded = async () => {

        const bookmarkBtnExist = document.getElementsByClassName("bookmark-btn")[0];
        currentVideoBookmarks = await fetchBookmarks();


        if(!bookmarkBtnExist){
            const bookmarkBtn = document.createElement("img");

            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png")
            bookmarkBtn.className = "ytp-button " + "bookmark-btn";
            bookmarkBtn.title = "Click to bookmark the ts"

            youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName("video-stream")[0];
            
            youtubeLeftControls.appendChild(bookmarkBtn)

            bookmarkBtn.addEventListener("click",addNewBookmarkEventHandler)
        }
    }
    const addNewBookmarkEventHandler = async () => {
        const currentTime = youtubePlayer.currentTime;
        const newBookmark =  {
            time: currentTime,
            desc: "Saved at " + getTime(currentTime)
        };
        // console.log(123)
        currentVideoBookmarks = await fetchBookmarks();

        // console.log(newBookmark);

        // console.log('newBm',newBookmark)
        chrome.storage.sync.set({
            [currentVideo] : JSON.stringify([...currentVideoBookmarks,newBookmark].sort((a,b) => a.time - b.time))
        })
    }
    // newVideoLoaded()
})();

const getTime = (t) => {
    var date = new Date(0);
    date.setSeconds(t)

    return date.toISOString().substr(11, 8)

}