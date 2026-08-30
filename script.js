// ඔයාගේ Monetag Direct Link එක
const monetagDirectLink = "https://omg10.com/4/11688292";

// ඔයාගේ RapidAPI Key එක (ඇතුළත් කර ඇත)
const RAPIDAPI_KEY = "fc3313aeb4msh4e250bdb8125d67p1e15a4jsna8c5d65275d1";

// ඔයා තෝරගත්ත "All-In-One" API එකේ Host එක
const RAPIDAPI_HOST = "all-in-one-media-downloader-api.p.rapidapi.com"; 

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

    // ඕනෑම ලින්ක් එකක් ආරක්ෂිතව API එකට යවන්න පුළුවන් විදිහට Encode කිරීම
    const encodedUrl = encodeURIComponent(urlInput);

    // API එකේ Endpoint URL එක
    const apiUrl = `https://${RAPIDAPI_HOST}/download?url=${encodedUrl}`;

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
            console.log("All-in-One API Response:", data);
            
            // All-in-One API වලින් ලින්ක් එක එවන නම සෙවීම
            let foundUrl = data.url || data.video || data.video_url || data.download_url || (data.data && data.data.video) || (data.links && data.links[0]?.url) || (data.data && data.data.url);
            let foundThumb = data.thumbnail || data.thumb || data.cover || data.picture || (data.data && data.data.thumbnail) || (data.data && data.data.cover);
            let foundTitle = data.title || data.desc || data.description || "Ready to download your video!";

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
