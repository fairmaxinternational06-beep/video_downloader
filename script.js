// ඔයාගේ අලුත් Adsterra Smartlink එක (Direct Link) මෙතනට දාන්න
const adsterraDirectLink = "https://www.profitableratecpmnetwork.com/c73bzjx2?key=b2e3d0fefb6e666dc2a073685add7cfd";

// ඔයාගේ RapidAPI Key එක 
const RAPIDAPI_KEY = "fc3313aeb4msh4e250bdb8125d67p1e15a4jsna8c5d65275d1";

// අලුත් "Download All In One – Pro" API එකේ Host එක
const RAPIDAPI_HOST = "download-all-in-one-pro.p.rapidapi.com"; 

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

    // ලින්ක් එක ආරක්ෂිතව Encode කිරීම
    const encodedUrl = encodeURIComponent(urlInput);

    // අලුත් API එකේ Endpoint URL එක (GET ක්‍රමයට)
    const apiUrl = `https://${RAPIDAPI_HOST}/v1/social/autolink?url=${encodedUrl}`;

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
            console.log("Download All In One Pro API Response:", data);
            
            // Thumbnail සහ Title ගැනීම
            let foundThumb = data.thumbnail || data.cover || "https://via.placeholder.com/600x320/0f172a/6366f1?text=Video+Ready";
            let foundTitle = data.title || "Ready to download your video!";
            
            // හොඳම වීඩියෝ ලින්ක් එක සෙවීම (medias Array එකෙන්)
            let foundUrl = "";
            
            if (data.medias && data.medias.length > 0) {
                const mp4Video = data.medias.find(m => m.type === "video" && m.ext === "mp4");
                if (mp4Video && mp4Video.url) {
                    foundUrl = mp4Video.url;
                } else {
                    const anyVideo = data.medias.find(m => m.type === "video");
                    if (anyVideo && anyVideo.url) {
                        foundUrl = anyVideo.url;
                    } else if (data.url) {
                        foundUrl = data.url;
                    }
                }
            } else if (data.url) {
                foundUrl = data.url;
            }

            if(foundUrl) {
                directVideoUrl = foundUrl; 
                
                document.getElementById('videoThumbnail').src = foundThumb;
                document.getElementById('videoTitle').innerText = foundTitle;
                
                document.getElementById('previewBox').style.display = 'block';
                isAdShown = false; 
                document.getElementById('downloadBtn').innerHTML = '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg> Download Video';
            } else {
                alert("වීඩියෝ ලින්ක් එකක් සොයාගැනීමට නොහැකි විය: (කරුණාකර F12 ඔබලා Console එක බලන්න)");
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
        window.open(adsterraDirectLink, '_blank');
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
