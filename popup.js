var activeTab = 0;
var menuButtons = [];
var htmlSources = ["popup/general.html", "popup/clock.html", "popup/days.html", 
    "popup/weather.html", "popup/productivity.html"];
var content = document.getElementById("content");

setup();

function setup()
{
    menuButtons = $("#menu").children();

    for (let i = 0; i < menuButtons.length; i++)
    {
        menuButtons[i].onclick = function() {onClick(i)};
    }
    menuButtons[0].className = "menu-button-highlight";
    $("#content").load(htmlSources[0]);
}

function resetButtonsColor()
{
    for (let i = 0; i < menuButtons.length; i++)
    {
        if (i != activeTab)
        {
            menuButtons[i].style.backgroundColor = null;
        }
    }
}

function onClick(tab)
{
    // load content based on selected menu tab
    if (activeTab != tab)
    {
        menuButtons[activeTab].className = "menu-button";
        activeTab = tab;
        $("#content").empty();
        resetButtonsColor();
        menuButtons[tab].className = "menu-button-highlight";
        $("#content").load(htmlSources[tab]);
    }
}