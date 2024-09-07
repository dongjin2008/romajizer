console.log("Content script running");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getLyrics") {
    let element = document.querySelector('.non-expandable.description.style-scope.ytmusic-description-shelf-renderer');
    if (element) {
      let text = element.textContent;
      let textArray = text.split('\n');
      let lyricsArray = new Array(textArray.length); // Array to store responses in order
      let fetchPromises = textArray.map((line, index) => {
        return fetch('https://clean-beatrisa-djakehihi-a120e2e4.koyeb.app/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'text': line.trim(),
          }),
        })
          .then(response => response.json())
          .then(data => {
            lyricsArray[index] = String(data[0]); // Store response in the correct order
          })
          .catch(error => console.error('Error:', error));
      });

      Promise.all(fetchPromises).then(() => {
        let lyrics = lyricsArray.join("\n"); // Join the responses in order
        sendResponse({ data: lyrics });
      });
    } else {
      sendResponse({ data: "Element not found" });
    }
    return true; // Indicates that the response will be sent asynchronously
  }
});