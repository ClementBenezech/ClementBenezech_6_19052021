function createPhotographer (photographerData) {
    return {
      id: photographerData.id,
      name: photographerData.name,
      city: photographerData.city,
      country: photographerData.country,
      tags: photographerData.tags,
      tagline: photographerData.tagline,
      price: photographerData.price,
      image: photographerData.portrait,
        
        renderCard: function () {
            //will render the photographer card on the home page
           
            containerDiv = domController("div", this.id, "main-content__photographer-card", "main-content").renderDomElement();
            /*console.log(containerDiv);*/
            
            containerDiv.addEventListener("click", () => {
                    this.renderPhotographerPage();
            })
            portraitDiv = domController("img", "portrait", "main-content__photographer-card__portrait", containerDiv.id, this.image).renderDomElement() ;
            nameDiv = domController("div", "name", "main-content__photographer-card__name", containerDiv.id, this.name).renderDomElement();
            locationDiv = domController("div", "location", "main-content__photographer-card__location", containerDiv.id, this.city+", "+this.country).renderDomElement();
            taglineDiv = domController("div", "tagline", "main-content__photographer-card__tagline", containerDiv.id, this.tagline).renderDomElement();
            priceDiv = domController("div", "price", "main-content__photographer-card__price", containerDiv.id, this.price).renderDomElement();
            tagsDiv = domController("div", "tags"+this.id, "main-content__photographer-card__tag-list", containerDiv.id).renderDomElement();
            globalMediaList[0].getTagList(this).forEach( tag => {
                currentTag = domController("div", "tag", "main-content__photographer-card__tag-list__tag", tagsDiv.id, tag).renderDomElement();
                /*console.log ("On crée le tag "+tag+" dans la div "+tagsDiv.id);*/
            })             
            /*console.log("Artist name is"+this.name+" and his tagline is "+this.tagline);*/
        },
        renderPhotographerPage: function() {
            //Génère la page photographer. Fait appel à rendermediaList pour le contenu media.
            
            domElementCreator.deleteMainContent();    
            this.renderPhotographerHeader();         

            //Rendu de la liste de médias.
            domElementCreator.renderFilterMenu(this);
            globalMediaList[0].renderMediaList(this, "title");
        },
        renderPhotographerHeader: function() {
                //Generate stuff for the header of the photographer page.
                containerDiv = domController("div", this.id, "main-content__photographer-header", "main-content").renderDomElement();

                this.renderBusinessCard();

                portraitDiv = domController("img", "portrait", "main-content__photographer-card__portrait", containerDiv.id, this.image).renderDomElement();      
                /*priceDiv = this.domController("div", "price", "main-content__photographer-card__price", containerDiv.id, this.price);*/
                
                   
        },
        renderBusinessCard: function() {
          //Will display information about a photographer on it's page. Used by renderPhotographerHeader
            businessCardDiv = domController("div", "business-card", "main-content__business-card", containerDiv.id).renderDomElement();
            nameDiv = domController("div", "name", "main-content__business-card__name", businessCardDiv.id, this.name).renderDomElement() ;
            locationDiv = domController("div", "location", "main-content__business-card__location", businessCardDiv.id, this.city+", "+this.country).renderDomElement();
            taglineDiv = domController("div", "tagline", "main-content__business-card__tagline", businessCardDiv.id, this.tagline).renderDomElement();
            /*Gestion des tags à séparer dans une méthode*/
            tagsDiv = domController("div", "tags"+this.id, "main-content__business-card__tag-list", businessCardDiv.id).renderDomElement();
            this.tags.forEach( tag => {
                    currentTag = domController("div", "tag", "main-content__photographer-card__tag-list__tag", tagsDiv.id, tag).renderDomElement();
                    /*console.log ("On crée le tag "+tag+" dans la div "+tagsDiv.id);*/
            })
        },
      

        };
  }
  
  function createMedia (mediaData) {
    return {  
                id: mediaData.id,
                photographerId:	mediaData.photographerId,
                title: mediaData.title,
                image: mediaData.image,
                video: mediaData.video,
                tags: mediaData.tags,	
                likes: mediaData.likes,
                date:  mediaData.date,	
                price: mediaData.price,
                renderMedia: function () {
                    if (this.image) {
                        console.log("render a photo");
                    }
                    else if (this.video) {
                        console.log("render a video");
                    }
                },
                addToCollection: function () {
                    globalMediaList.push(this);
                },
                getTagList: function(photographer) {

                    
                                     
                    let photographerMediaList = globalMediaList;
                    if (photographer == "global") {
                        
                    }
                    else{
                        photographerMediaList = globalMediaList.filter(media => photographer.id == media.photographerId);
                        /*console.log("media tags resquested by a photograph");*/
                    }
    
                    globalTagList = new Array(0);
                    /*console.log(photographerMediaList);*/
    
                        photographerMediaList.forEach(media => {
                                media['tags'].forEach(tag => {
                                globalTagList.push(tag); 
                                /*console.log(tag);*/
                            })
                        })
                        //gettingDistinct Tags values from the global tag list
                        const distinctTagList = [...new Set(globalTagList)];
                        /*console.log("distinct tag list: "+distinctTagList)*/
                        return distinctTagList;
    
                },
                renderMediaList: function (photographer, orderBy) {
                //Selecting photographer's media in the globalMediaList
                                
                
                
                const photographerMediaList = globalMediaList.filter(media => media.photographerId == photographer.id);
                console.log(photographerMediaList);
                photographerMediaList.sort((a,b) => { 
                    
                    console.log(orderBy);
                    switch (orderBy) {
                        
                        case "title":
                            return a.title.localeCompare(b.title);
                        case "date":
                            console.log("inside case DATE")
                            current = new Date(a.date);
                            currentPlusOne = new Date(b.date);
                            let result = "0";
                            
                            if (current < currentPlusOne) {
                                result = -1;
                            }
                            else if (current > currentPlusOne) {
                                result = 1;
                            }
                            return result;

                        case "likes": 
                            if (a.likes < b.likes) {
                                return -1;
                            }
                            else if (a.likes > b.likes) {
                                return 1;
                            }
                            else{
                                return 0;
                            }
                            default:    
                            /*return 0;*/
                            console.log("default condition of orderBy switch");
                            return 0;
                    }
                })

                console.log(photographerMediaList)

                if (document.getElementById("main-content__media-list") == undefined) {
                    mediaContainer = domController("div", "main-content__media-list", "main-content__media-list", "main-content").renderDomElement();
                }
                else
                {
                    document.getElementById("main-content__media-list").innerHTML = "";
                }
                
                

                photographerMediaList.forEach (media => {
                    /*console.log(media.image);*/

                    let mediaType;
                    let mediaLink;
                    let aMedia;
                    console.log(media)
                    //finding out media-type
                    if (media.image != undefined){
                        mediaType = "img";
                        mediaLink = media.image;
                        }
                    else if (media.video != undefined){
                        mediaType = "video";
                        mediaLink = media.video;
                        }

                        aMedia = domController(mediaType, media.id, "main-content__media-list__media", mediaContainer.id, mediaLink);
                        
                        aMediaDiv = aMedia.renderDomElement();
                        console.log("amediadiv");
                        console.log(aMediaDiv);
                        aMediaDiv.addEventListener("click", () => {aMedia.renderModale(mediaLink)});
                        

                                          
              

  
                    
                    //add an event listener trigerring the image viewer modale
                })
            },
            }
    }

   function domController(elementTag, elementId, elementClass, elementParent, elementContent) {
        //Will create a dom element to render the specified element on the page
        //Also provides methods to interact with the DOM: deletMainContent and renderHome
        return {

            elementTag: elementTag,
            elementId: elementId,
            elementClass: elementClass,
            elementParent: elementParent,
            elementContent: elementContent,

            deleteMainContent: function() {
                    //Identification des éléments à retirer du main content.
                    mainContentChildren = document.getElementById("main-content").children;
                    //Transformationd de la collection d'éléments en Array[]
                    mainContentChildren = Array.prototype.slice.call(mainContentChildren, 0)
                    const contentToActuallyDump = mainContentChildren.filter(content => content.id != "main-content__title");

                    //Supression des éléments à retirer de la page.
                    contentToActuallyDump.forEach(content => {
                            content.remove();
                    })
            },

            renderModale: function(mediaLink) {
                
        modalContainer = domController("div", "modal-viewer", "modal-viewer", "body").renderDomElement();
                modalePicture = domController(this.elementTag, this.elementId, "modal-viewer__media", modalContainer.id, mediaLink ).renderDomElement();
             },

            renderFilterMenu: function(photographer) {
                let filters = new Array("title", "likes", "date");
                filterMenu = domController("div", "filter-menu", "filter-menu", "main-content").renderDomElement() ;
                filters.forEach(filter => {
                    console.log("CurrentFilter "+filter);
                    filterDiv = domController("div", filter, "filter-menu__filter", filterMenu.id, filter).renderDomElement() ;
                    filterDiv.addEventListener("click", () => {
                        globalMediaList[0].renderMediaList(photographer, filter);
                        console.log("setting up the event listener for a filter named "+filter);
                    });
                })
            },

            renderHome: function(selectedTag) {
                    //each time home is rendered, we call the api again (in case site content has been uptdated in the meantime. )
                    //alternatively we could create a initializeData function which would do the "fetching job" and we could call this whenever we want
                    console.log("rendering home");
                    this.deleteMainContent();
                        //Create a Global Media List to be accessed by the PhotoGrapher Object
                    globalMediaList = new Array(0);
                    photographerList = [];
                    fetch('./public/FishEyeData.json').then(response => {
                            return response.json();
                        
                                    }).then(data => {  
                                        //Creating media and adding it to collection
                                        data['media'].forEach(media => {
                                        let currentMedia = createMedia (media);
                                        currentMedia.addToCollection();
                                        })
                                        //Creating Photographers Objects
                                        //Generating Photographers cards on the front page

                                        data['photographers'].forEach(photographer => {
                                            
                                            if (selectedTag != undefined){
                                            photographer["tags"].forEach(tag => {
                                                    if (tag == selectedTag) {                                             
                                                        currentPhotographer = createPhotographer (photographer);
                                                        photographerList.push(currentPhotographer);
                                                        currentPhotographer.renderCard();
                                                    }
                                                })
                                            }
                                            else 
                                            {
                                                        currentPhotographer = createPhotographer (photographer);
                                                        photographerList.push(currentPhotographer);
                                                        currentPhotographer.renderCard();
                                            }
                                        })
                                        
                                        
                                        //Getting global Tag list and inserting it into the header. Clearing previous tag list before.
                                        document.getElementById("header__tag-bar").innerHTML = "";
                                        globalMediaList[0].getTagList("global").forEach( tag => {
                                            currentTag = domController("div", "tag", "header__tag-bar__tag", "header__tag-bar", tag).renderDomElement();
                                            //addingEventListener on each tag. Will use renderHome with a tag parameter to display only relevant photographs
                                            currentTag.addEventListener("click", () => {
                                                this.renderHome(tag)});
                                        })
                                    })

            },
            //Now this will create a dom element using the properties provided when creating the object.
            //It handles different types of content appropriately (div, img and video tags)
            renderDomElement: function() {
                    /*console.log("rendering something");
                    console.log(this.elementTag);*/
                    switch (this.elementTag) {
                        case "div":
                                    let newDiv = document.createElement(this.elementTag);
                                    newDiv.id = this.elementId;
                                    newDiv.className = this.elementClass;
                                    document.getElementById(this.elementParent).appendChild(newDiv);
                                    if (this.elementContent) {
                                        newDiv.innerHTML += this.elementContent;
                                    }
                                    return newDiv;   
                                break;
                        case "img":
                        case "video":
                                    let newImg = document.createElement(this.elementTag);
                                    newImg.id = this.elementId;
                                    newImg.className = this.elementClass;
                                    newImg.setAttribute("src", "public/images/small/"+this.elementContent);
                                    
                                    document.getElementById(this.elementParent).appendChild(newImg);
                                    if (this.elementTag == "video") {
                                        document.getElementById(newImg.id).controls = true; ;
                                    }
                                    return newImg; 
                                break;
                                }
                                /*console.log(newDiv);*/
                                        
                    }
                      
            }
           
    }

    

//Api Call. Getting Photographers and Media information from example JSON file.
function InitializePage() {

    //Create a dom element creator as an entry point for the object public methods renderHome, deleteMainContent
    domElementCreator = domController();

    //Adding eventListener to the logo. On click, it will reload the home page
    document.getElementById("header__logo").addEventListener("click", () => { domElementCreator.renderHome()});

    //rendering Home Page
    domElementCreator.renderHome();
}



InitializePage();

  