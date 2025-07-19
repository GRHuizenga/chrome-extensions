import { AccessibilityAnalyzer } from './analyzers/accessibility-analyzer';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Content script received message:', message, sender, document);
  if (message.type === 'GET_HEADINGS') {
    sendResponse({ data: AccessibilityAnalyzer.getHeadings(document) });
  }
  if (message.type === 'HIGHLIGHT_HEADING') {
    const index = message.data?.index;
    if (typeof index === 'number') {
      AccessibilityAnalyzer.highLight(document, index);
      sendResponse({ success: true });
    } else {
      sendResponse({ success: false, error: 'Invalid index' });
    }
  }
});
