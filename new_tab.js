// console.log(chrome.storage.local.get['cnt-tab-name']);
// document.title = chrome.storage.local.get['cnt-tab-name'];

// For compatibility with other browsers like Firefox or Edge
// chrome.storage needs to be changed to browser.storage
// TODO: create function that deals with this and abstracts 
// the get function from the storage api

init();

function init()
{
    chrome.storage.sync.get(["cnt_tab_name", "cnt_bg_color", "cnt_dudate", 
                            "cnt_dudate_name"], function(result) 
    {
        if (result.cnt_tab_name) 
        {
            document.title = result.cnt_tab_name;
        }

        if (result.cnt_bg_color)
        {
            document.body.style.backgroundColor = result.cnt_bg_color;
        }

        if (result.cnt_dudate && result.cnt_dudate_name) 
        {
            var dudateName = result.cnt_dudate_name;
            var today = new Date();
            var dudate = new Date(result.cnt_dudate);
            var diff = Math.abs(dudate - today);
            var days = Math.trunc(diff / (1000 * 3600 * 24));
            const lang = navigator.language;
            displayDate = dudate.toLocaleDateString(lang, {
                weekday: 'short', day: 'numeric',
                year: 'numeric', month: 'long'
            });

            document.getElementById("days").innerText = days;
            document.getElementById("ud").innerText = "Days until " 
                + dudateName.toUpperCase();
            document.getElementById("date").innerText = "(" + displayDate 
                + ")";
        }
    });
}

