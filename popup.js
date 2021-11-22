var activeTab = 0;
var menuButtons = [];
var htmlSources = ["popup/general.html", "popup/clock.html", "popup/days.html", 
    "popup/weather.html", "popup/productivity.html"];
var content = document.getElementById("content");

init();

function init()
{
    menuButtons = $("#menu").children();

    for (let i = 0; i < menuButtons.length; i++)
    {
        menuButtons[i].onclick = function() {onClick(i)};
    }
    menuButtons[0].className = "menu-button-highlight";
    $("#content").load(htmlSources[0], function() {
        if (document.getElementById("btn-save"))
        {
            document.getElementById("btn-save").onclick = function() {onSave()};
            document.getElementById("btn-reset").onclick = function() {onReset()};
        }
    });
}

function onClick(tab)
{
    // load content based on selected menu tab
    if (activeTab != tab)
    {
        menuButtons[activeTab].className = "menu-button";
        menuButtons[tab].className = "menu-button-highlight";
        $("#content").empty();
        $("#content").load(htmlSources[tab], function() {
            if (document.getElementById("btn-save"))
            {
                document.getElementById("btn-save").onclick = function() {onSave()};
                document.getElementById("btn-reset").onclick = function() {onReset()};
            }
        });
        activeTab = tab;
    }
}

function onSave()
{
    // Save input data to local storage
    switch(activeTab)
    {
        case 0:
            var tabName = $("#tab-name").val();
            var bgColor = $("#bg-color").val();
            if (tabName !== "")
            {
                // window.localStorage.setItem('cnt-title', tabName);
                console.log(tabName);
                // chrome.storage.local.set({'cnt-tab-name': tabName});
                chrome.storage.sync.set({"cnt_tab_name": tabName, 
                    "cnt_bg_color": bgColor}, function()
                {
                    console.log("Tab name is set to " + tabName);
                    console.log("Background color is set to " + bgColor);
                    $("#tab-name").val("");
                });
            }
            break;
    }
    // Reload custom new tab page
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
}

function onReset()
{
    switch(activeTab)
    {
        case 0:


            break;
    }
    // Reset all values by deleting the keys from local storage
    console.log("Reset values!");
    // window.localStorage.removeItem('cnt-title');
    // window.localStorage.remoteItem('cnt-bg-color');
}