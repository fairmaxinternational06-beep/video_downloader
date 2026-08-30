// ඔයාගේ Monetag Direct Link එක
const monetagDirectLink = "https://omg10.com/4/11688292";

// ඔයාගේ RapidAPI Key එක 
const RAPIDAPI_KEY = "fc3313aeb4msh4e250bdb8125d67p1e15a4jsna8c5d65275d1";

// YTStream API Host එක
const RAPIDAPI_HOST = "ytstream-download-youtube-videos.p.rapidapi.com"; 

let isAdShown = false; 
let directVideoUrl = ""; 

function fetchVideo() {
    const urlInput = document.getElementById('videoUrl').value;
    
    if(!urlInput) {
        alert("කරුණාකර Video Link එකක් ඇතුලත් කරන්න!");
        return;
    }

    document.getElementById('loader').style.display = 'block';
    document.getElementById('previewBox').style.display = 'none';

    let videoId = "";
    try {
        if (urlInput.includes("youtu.be/")) {
            videoId = urlInput.split("youtu.be/")[1].split("?")[0];
        } else if (urlInput.includes("youtube.com/watch")) {
            videoId = new URL(urlInput).searchParams.get("v");
        }
    } catch(e) {
        console.error("Invalid URL format");
    }

    if(!videoId) {
        alert("කරුණාකර නිවැරදි YouTube ලින්ක් එකක් ලබා දෙන්න.");
        document.getElementById('loader').style.display = 'none';
        return;
    }

    const apiUrl = `https://${RAPIDAPI_HOST}/dl?id=${videoId}`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': RAPIDAPI_KEY,
            'x-rapidapi-host': RAPIDAPI_HOST
        }
    };

    fetch(apiUrl, options)
        .then(response => response.json())
        .then(data => {
            document.getElementById('loader').style.display = 'none';
            
            let foundUrl = data.url || data.link || data.download_url || data.dlink;
            
            if (!foundUrl && data.formats && data.formats.length > 0) {
                foundUrl = data.formats[0].url;
            } else if (!foundUrl && data.links && data.links.length > 0) {
                foundUrl = data.links[0].url || data.links[0].link;
            }

            if(foundUrl) {
                directVideoUrl = foundUrl; 
                
                // API එක මත යැපෙන්නේ නැතුව, කෙලින්ම YouTube එකෙන්ම Thumbnail එක ගැනීම
                document.getElementById('videoThumbnail').src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
                
                if(data.title) {
                    document.getElementById('videoTitle').innerText = data.title;
                } else {
                    document.getElementById('videoTitle').innerText = "Ready to download your video!";
                }
                
                document.getElementById('previewBox').style.display = 'block';
                isAdShown = false; 
                document.getElementById('downloadBtn').innerHTML = '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg> Download Video';
            } else {
                alert("වීඩියෝව සොයාගැනීමට නොහැකි විය: (Console එක පරීක්ෂා කරන්න)");
            }
        })
        .catch(err => {
            document.getElementById('loader').style.display = 'none';
            console.error("Fetch Error:", err);
            alert("දෝෂයක් මතු විය! කරුණාකර නැවත උත්සාහ කරන්න.");
        });
}

function handleDownload() {
    if (!isAdShown) {
        window.open(monetagDirectLink, '_blank');
        isAdShown = true; 
        document.getElementById('downloadBtn').innerHTML = "Click Again to Download";
    } else {
        if (directVideoUrl) {
            window.open(directVideoUrl, '_blank'); 
            document.getElementById('downloadBtn').innerHTML = "Downloading...";
            setTimeout(() => {
                document.getElementById('downloadBtn').innerHTML = '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg> Download Video';
                isAdShown = false; 
            }, 3000);
        }
    }
}