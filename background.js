// background.js

console.log("SecurePass360 background service worker started");

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed successfully");
});