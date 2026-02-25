const wallpapers = [
  "images/anime.png",
  "images/beach.png",
  "images/fauna.png", 
  "images/nature1.png",
  "images/nature2.png",
  "images/random.png",
  "images/spaceshuttle.png",
  "images/workspace.png",
];

// Pick random wallpaper
const randomWallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)];
document.body.style.backgroundImage = `url(${randomWallpaper})`;

document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.getElementById("search-box");
  const micBtn = document.getElementById("mic-btn");
  const lensBtn = document.getElementById("lens-btn");
  //const imageInput = document.getElementById("image-input");

  // Normal Google Search
  searchBox.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      const query = e.target.value.trim();
      if (query) {
        window.location.href = "https://www.google.com/search?q=" + encodeURIComponent(query);
      }
    }
  });

  // Voice Search (Custom)
  micBtn.addEventListener("click", function() {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        searchBox.value = transcript;
        window.location.href = "https://www.google.com/search?q=" + encodeURIComponent(transcript);
      };

      recognition.onerror = function(event) {
        alert("Voice search failed: " + event.error);
      };
    } catch (err) {
      alert("Your browser doesn’t support Speech Recognition.");
    }
  });

});

