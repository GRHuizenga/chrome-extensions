// Background script - message relay between DevTools and Content Script
// leaving it for now, but as of yet i dont need it. direct communication
// between devtools and content script works fine

// chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
//   console.log("Background script received message:", message);
//   chrome.tabs.query({ active: true }, ([tab]) => {
//     console.log("Active tab found:", tab);
//     chrome.tabs.sendMessage(tab.id, message, (response) => {
//       console.log("Response from content script:", response);
//       sendResponse(response);
//     });
//   });
//   return true;
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log("Background script received message:", message);
//   if (message.source === "devtools-panel") {
//     const tabId = message.tabId;

//     if (!tabId) {
//       console.error("No tab ID provided");
//       sendResponse({ success: false, error: "No tab ID provided" });
//       return;
//     }

//     console.log("Forwarding message to content script in tab:", tabId);

//     // Forward message to content script
//     chrome.tabs.sendMessage(tabId, message, (response) => {
//       if (chrome.runtime.lastError) {
//         console.error(
//           "Error sending message to content script:",
//           chrome.runtime.lastError.message,
//         );
//         console.log(
//           "This usually means the content script is not injected on this page",
//         );

//         // Try to inject the content script manually
//         chrome.scripting.executeScript(
//           {
//             target: { tabId: tabId },
//             files: ["content-script.js"],
//           },
//           () => {
//             if (chrome.runtime.lastError) {
//               console.error(
//                 "Failed to inject content script:",
//                 chrome.runtime.lastError.message,
//               );
//               sendResponse({
//                 success: false,
//                 error:
//                   "Content script not available and injection failed: " +
//                   chrome.runtime.lastError.message,
//               });
//             } else {
//               console.log(
//                 "Content script injected successfully, retrying message...",
//               );
//               // Retry the message after injection
//               setTimeout(() => {
//                 chrome.tabs.sendMessage(tabId, message, (retryResponse) => {
//                   if (chrome.runtime.lastError) {
//                     sendResponse({
//                       success: false,
//                       error:
//                         "Content script still not responding after injection: " +
//                         chrome.runtime.lastError.message,
//                     });
//                   } else {
//                     console.log("Message sent successfully after injection");
//                     sendResponse(retryResponse);
//                   }
//                 });
//               }, 100);
//             }
//           },
//         );
//       } else {
//         console.log("Content script responded successfully:", response);
//         sendResponse(response);
//       }
//     });

//     return true; // Keep message channel open for async response
//   }
// });
