//Api Call. Getting Photographers and Media information from example JSON file.
function initializePage() {

    
    globalMediaList = new Array(0);
    photographerList = [];
    fetch("../FishEyeData.json").then(response => {
            return response.json();
    })
    .then(data => {  
        //Creating media and adding it to collection
        data['media'].forEach(media => {
        let currentMedia = createMedia (media);
        currentMedia.addToCollection();
        })
        //Creating Photographers Objects

        data['photographers'].forEach(photographer => {                         
                        currentPhotographer = createPhotographer(photographer);
                        photographerList.push(currentPhotographer);
        })
    }).then(() => {
                        
        //As i've changed the website architecture to "two pages" instead of "one page", we need to retrieve the GET parameter.
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        selectedPhotographerId = urlParams.getAll('photographer')[0];

        //Then, we get the right photographer object from the photographer array
        selectedPhotographer = photographerList.find(photographer => photographer.id === parseInt(selectedPhotographerId, 10));
                            
        //We render the photographer page for the specified photographer.
        selectedPhotographer.renderPhotographerPage();
        })



    //Create a dom element creator as an entry point for the object public methods renderHome, deleteMainContent...
    domElementCreator = domController();

    //Adding eventListener to the logo. On click, it will reload the home page
    document.getElementById("header__logo").addEventListener("click", () => { window.open ('../../index.html','_self',false);});

    //Adding eventlistener on the contact modale close button
    document.getElementById('contact-modale__close').addEventListener("click", () => {
        console.log(document.getElementById('contact-modale'));
        document.getElementById('contact-modale').className = "contact-modale--hidden";
    })

     //Adding eventlistener on the contact modale send buton
     document.getElementById('contact-modale__form__submit').addEventListener("click", event => {
        document.getElementById('contact-modale').className = "contact-modale--hidden";
        event.preventDefault();
        //emptying fields so the modale is empty again if reopened (simulates the form being sent)
        Array.prototype.slice.call(document.getElementById('contact-modale__form').children, 0).forEach(element => {
            if (element.id != "contact-modale__form__submit") {
                element.value = "";
            }
        })
    })
}

/*this variable is used to "prefix" the images paths when the dom element are generated*/
const pageUrlBase = "../../public/";

initializePage();
