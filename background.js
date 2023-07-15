chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    // Check if it's the request we're interested in
    if (
      details.method === "POST" &&
      details.url === "https://chat.openai.com/backend-api/conversation"
    ) {
      // Decode the request body
      let decoder = new TextDecoder();
      let bodyData = JSON.parse(
        decoder.decode(details.requestBody.raw[0].bytes)
      );

      // Modify the request body
      if (bodyData.messages && bodyData.messages[0].content.parts) {
        bodyData.messages[0].content.parts =
          bodyData.messages[0].content.parts.map((part) => "PREFIX_" + part);
        console.log(bodyData.messages[0].content.parts);
        C;
      }

      // Re-encode the modified bodyData into a string
      let encoder = new TextEncoder();
      let newBodyDataStr = encoder.encode(JSON.stringify(bodyData));

      // Return modified request
      return {
        requestBody: {
          raw: [
            {
              bytes: newBodyDataStr,
            },
          ],
        },
      };
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking", "requestBody"]
);
