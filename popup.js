let toggleButton = document.getElementById("toggle-button");
let colorPicker = document.getElementById("color-picker");

// Retrieve the stored color from Chrome's storage and set it to colorPicker's value
chrome.storage.sync.get("color", ({ color }) => {
  colorPicker.value = color || "#FFFFFF";
});

// Listen for clicks on the toggle button
toggleButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Send a message to the active tab's content script
  chrome.tabs.sendMessage(tab.id, { color: colorPicker.value });

  // Store the color in Chrome's storage
  chrome.storage.sync.set({ color: colorPicker.value });
});
