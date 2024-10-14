let filteringEnabled = true;

chrome.action.onClicked.addListener((tab) => {
  filteringEnabled = !filteringEnabled;
  chrome.tabs.sendMessage(tab.id, { action: "toggleFilter" }, (response) => {
    if (response.filteringEnabled) {
      chrome.action.setIcon({ path: "icon128.png" });
    } else {
      chrome.action.setIcon({ path: "icon_disabled.png" });
    }
  });
});