document.getElementById("scrape-button").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    try {
      let result = await chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: extractChat,
      });

      if (result && result.length > 0 && result[0].result) {
        document.getElementById("scraped-chat").innerText = result[0].result;
      } else {
        document.getElementById("scraped-chat").innerText = "No text found";
      }
    } catch (error) {
      console.log("Could not extract chat:", error);
    }
  });
});

function extractChat() {
  let selector = ".flex.flex-col.text-sm.dark\\:bg-gray-800";
  let element = document.querySelector(selector);
  return element ? element.textContent : null;
}
