// Listen for a message from the popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Use the received color to change the background color of the current page
  chrome.scripting.executeScript({
    target: { tabId: sender.tab.id },
    function: setBackgroundColor,
    args: [request.color],
  });
});

// This function is serialised and executed in the context of the current page
function setBackgroundColor(color) {
  document.body.style.backgroundColor = color;
}
