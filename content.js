
// Keywords to identify AI-generated images
const keywords = ["AI-generated", "Midjourney", "Stable Diffusion", "DALL-E"];

let filteringEnabled = true;

function filterImages() {
  if (!filteringEnabled) return;

  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    const altText = img.alt.toLowerCase();
    const srcUrl = img.src.toLowerCase();

    // Hide images that match any keyword
    if (keywords.some(keyword => altText.includes(keyword.toLowerCase()) || srcUrl.includes(keyword.toLowerCase()))) {
      img.style.display = 'none';
    }
  });
}

// Run the filter when the page is loaded
window.addEventListener('load', filterImages);
// Optionally, run periodically in case new images load dynamically
setInterval(filterImages, 3000);

// Listen for messages from the background script to toggle filtering
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleFilter") {
    filteringEnabled = !filteringEnabled;
    sendResponse({ filteringEnabled });
    if (!filteringEnabled) {
      document.querySelectorAll('img').forEach((img) => {
        img.style.display = '';
      });
    } else {
      filterImages();
    }
  }
});