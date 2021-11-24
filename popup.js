var activeTab = 0;
var menuButtons = [];
var htmlSources = ["popup/general.html", "popup/clock.html", 
    "popup/days.html", "popup/weather.html", "popup/productivity.html"];
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
    // Load content based on selected menu tab
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
        // General
        case 0:
            generalSave();
            break;
        // Clock
        case 1:
            break;
        // Days until date
        case 2:
            daysSave();
            break;
        // Weather    
        case 3:
            weatherSave();
            break;
        // Productivity
        case 4:
            break;
    }
    // Reload custom new tab page
    // TODO: reload only if data was saved
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
}

function generalSave()
{
    var tabName = $("#tab-name").val();
    var bgColor = $("#bg-color").val();
    if (tabName !== "")
    {
        chrome.storage.sync.set({"cnt_tab_name": tabName, 
                                "cnt_bg_color": bgColor}, 
                                function()
        {
            console.log("Tab name is set to " + tabName);
            console.log("Background color is set to " + bgColor);
            $("#tab-name").val("");
        });
    }
}

function daysSave()
{
    var dateName = $("#date-name").val(); 
    var date = $("#date").val();
    var style = $("#style option:selected").val();
    var includeToday = $("#today").is(":checked");
    var includeLastDay = $("#last-day").is(":checked");
    if (date && dateName != "")
    {
        chrome.storage.sync.set({"cnt_dudate": date,
                                "cnt_dudate_name": dateName,
                                "cnt_dudate_style": style,
                                "cnt_dudate_today": includeToday,
                                "cnt_dudate_last_day": includeLastDay}, 
                                function() 
        {
            console.log("Date name is set to " + dateName);
            console.log("Date is set to " + date);
            console.log("Style is set to " + style);
            console.log("Today is set to " + includeToday);
            console.log("Last day is set to " + includeLastDay);
            $("#date-name").val("");
            $("#today").prop("checked", false);
            $("#last-day").prop("checked", false);
        });
    }
}

function weatherSave()
{
    var city = $("#city-name").val();
    var scale = $("#scale option:selected").val();
    if (city !== "")
    {
        chrome.storage.sync.set({"cnt_city_name": city, 
                                "cnt_scale": scale}, 
                                function()
        {
            console.log("City is set to " + city);
            console.log("Scale is set to " + scale);
            $("#city-name").val("");
        });
    }
}

function onReset()
{
    // Reset all values by deleting the keys from local storage
    switch(activeTab)
    {
        case 0:
            chrome.storage.sync.remove(["cnt_tab_name", "cnt_bg_color"]);
            break;
    }
    console.log("Values reset!");
    // Reload custom new tab page
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
}