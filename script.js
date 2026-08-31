// ඔයාගේ Monetag Direct Link එක
const monetagDirectLink = "https://omg10.com/4/11688292";

// ඔයාගේ RapidAPI Key එක 
const RAPIDAPI_KEY = "fc3313aeb4msh4e250bdb8125d67p1e15a4jsna8c5d65275d1";

// ඔයාගේ අලුත් API Host එක
const RAPIDAPI_HOST = "all-video-downloader3.p.rapidapi.com"; 

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

    // අලුත් API එකේ නිවැරදි Endpoint URL එක
    const apiUrl = `https://${RAPIDAPI_HOST}/all`;

    // අලුත් API එකට අවශ්‍ය විදිහට POST request එකක් යැවීම
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': RAPIDAPI_KEY,
            'x-rapidapi-host': RAPIDAPI_HOST,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            url: urlInput
        })
    };

    fetch(apiUrl, options)
        .then(response => response.json())
        .then(data => {
            document.getElementById('loader').style.display = 'none';
            console.log("All-in-One API Response:", data);
            
            // API එකෙන් ලින්ක් එක එවන නම සෙවීම
            let foundUrl = data.url || data.video || (data.data && data.data.url) || (data.data && data.data.video) || data.download_url;
            let foundThumb = data.thumbnail || data.thumb || (data.data && data.data.thumbnail) || (data.data && data.data.cover) || data.cover;
            let foundTitle = data.title || (data.data && data.data.title) || "Ready to download your video!";

            if(foundUrl) {
                directVideoUrl = foundUrl; 
                
                if(foundThumb) {
                    document.getElementById('videoThumbnail').src = foundThumb;
                } else {
                    document.getElementById('videoThumbnail').src = "https://via.placeholder.com/600x320/0f172a/6366f1?text=Video+Ready";
                }
                
                document.getElementById('videoTitle').innerText = foundTitle;
                
                document.getElementById('previewBox').style.display = 'block';
                isAdShown = false; 
                document.getElementById('downloadBtn').innerHTML = '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg> Download Video';
            } else {
                alert("වීඩියෝව සොයාගැනීමට නොහැකි විය: (කරුණාකර F12 ඔබලා Console එක බලන්න)");
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
