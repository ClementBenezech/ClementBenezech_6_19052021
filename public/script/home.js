//Api Call. Getting Photographers and Media information from example JSON file.
function initializePage() {

    //Create a dom element creator as an entry point for the object public methods renderHome, deleteMainContent
    domElementCreator = domController();

    //Adding eventListener to the logo. On click, it will reload the home page
    document.getElementById("header__logo").addEventListener("click", () => { window.open ('index.html','_self',false);});

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    requestedTag = urlParams.getAll('tag')[0];

    //rendering Home Page
    domElementCreator.renderHome(requestedTag);
}

/*this variable is used to "prefix" the images paths when the dom element are generated*/
const pageUrlBase = "public/";

initializePage();