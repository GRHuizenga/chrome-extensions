import { AccessibilityAnalyzer } from './analyzers/accessibility-analyzer';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Content script received message:', message, sender, document);
  sendResponse({ data: AccessibilityAnalyzer.getHeadings(document) });
});
