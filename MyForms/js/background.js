chrome.contextMenus.create({
    "title": "MyForms",
    "contexts": ["selection"],
    "onclick": openTab()
});

chrome.browserAction.onClicked.addListener(setup);
function setup() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "Found Form");
    })
}
function openTab() {
    console.log("HELLO");
    return function (info, tab) {
        let text = info.selectionText;
        let Link = "https://www.google.com/search?q=" + text
        chrome.tabs.create({
            index: tab.index + 1, url: Link,
            selected: true
        });
    }
};

