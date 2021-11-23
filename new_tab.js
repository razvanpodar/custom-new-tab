// console.log(chrome.storage.local.get['cnt-tab-name']);
// document.title = chrome.storage.local.get['cnt-tab-name'];

// For compatibility with other browsers like Firefox or Edge
// chrome.storage needs to be changed to browser.storage
// TODO: create function that deals with this and abstracts 
// the get function from the storage api

init();

function init()
{
    chrome.storage.sync.get(["cnt_tab_name", "cnt_bg_color"], function(result) {
        console.log('Tab name currently is ' + result.cnt_tab_name);
        if (result.cnt_tab_name)
        {
            document.title = result.cnt_tab_name;
        }
        console.log('Background color currently is ' + result.cnt_bg_color);
        if (result.cnt_bg_color)
        {
            document.body.style.backgroundColor = result.cnt_bg_color;
        }
    });
}

