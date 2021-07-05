//Api Call. Getting Photographers and Media information from example JSON file.
function initializePage() {

    //Create a dom element creator as an entry point for the object public methods renderHome, deleteMainContent
    domElementCreator = domController();

    //Adding eventListener to the logo. On click, it will reload the home page
    document.getElementById("header__logo").addEventListener("click", () => { window.open ('index.html','_self',false);});
    
    //Adding an eventListener on the page to detect when the content is scrolled
    //It will reveal the "back to top" button;
    document.addEventListener("scroll", () => { document.getElementById("header__back-to-top").classList.add("header__back-to-top--visible")});

    //then we add an event listener on this button when clicked
    document.getElementById("header__back-to-top").addEventListener("click", () => { 
        document.getElementById("main-content").focus({preventScroll:false});
    });
    //Also we add event listeners for SPACE and ENTER keys on the keyboard.             
    document.getElementById("header__back-to-top").addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            document.getElementById("main-content").focus({preventScroll:false});
        }          
    });                         

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    requestedTag = urlParams.getAll('tag')[0];

    //rendering Home Page
    domElementCreator.renderHome(requestedTag);
        
}

/*this variable is used to "prefix" the images paths when the dom element are generated*/
const pageUrlBase = "public/";

initializePage();