//Api Call. Getting Photographers and Media information from example JSON file.
function InitializePage() {

    //Create a dom element creator as an entry point for the object public methods renderHome, deleteMainContent
    domElementCreator = domController();

    //Adding eventListener to the logo. On click, it will reload the home page
    document.getElementById("header__logo").addEventListener("click", () => { window.open ('index.html','_self',false);});


    //rendering Home Page
    domElementCreator.renderHome();
}

/*this variable is used to "prefix" the images paths when the dom element are generated*/

var pageUrlBase = "../public/";

InitializePage();