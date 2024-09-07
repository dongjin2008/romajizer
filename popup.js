document.addEventListener("DOMContentLoaded", () => {
  // Send a message to the content script to get the variable
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getLyrics" }, (response) => {
          if (response && response.data) {
              document.getElementById("result").innerText = response.data;
          } else {
              document.getElementById("result").innerText = "No data received.";
          }
      });
  });
});
