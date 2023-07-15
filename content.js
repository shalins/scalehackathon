// content.js
function extractChat() {
  // find the HTML element containing the GPT chat
  const chatElement = document.getElementById("gpt-response");

  if (chatElement) {
    return chatElement.textContent;
  } else {
    return null;
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractChat") {
    sendResponse(extractChat());
  }
});
