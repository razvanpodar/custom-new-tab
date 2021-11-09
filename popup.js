var activeTab = 0;
var menuButtons = [];

setup();

function setup()
{
    var menuNodes = document.getElementById("menu").childNodes;
    for (let i = 0; i < menuNodes.length; i++)
    {
        // Keep only the element nodes
        if (menuNodes[i].nodeType == 1)
        {
            menuButtons.push(menuNodes[i]);
        }
    }
    
    console.log(menuButtons.length);

    for (let i = 0; i < menuButtons.length; i++)
    {
        menuButtons[i].onclick = function() {onClick(i)};
    }
    onClick(activeTab);
}

function clearContent()
{
    let content = document.getElementById("content");
    while (content.firstChild) 
    {
        content.removeChild(content.firstChild);
    }
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
    activeTab = tab;
    clearContent();
    resetButtonsColor();
    menuButtons[tab].style.backgroundColor = "red";
}