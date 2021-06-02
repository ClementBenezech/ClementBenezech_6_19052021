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
      orderBy: "Popularité",
        
        renderCard: function () {
            //will render the photographer card on the home page
           
            containerDiv = domController("button", this.id, "main-content__photographer-card", "main-content").renderDomElement();
            
            //Adding event listerner for keyboard and mouse navigation
            
            containerDiv.addEventListener("click", () => {
                window.open ("public/pages/photographer.html?photographer="+this.id,'_self',false);    
            })

            containerDiv.addEventListener("keydown", event => { 
                if (event.code === "Enter" || event.code === " ") {
                    window.open ("public/pages/photographer.html?photographer="+this.id,'_self',false);}
            });

            
            portraitDiv = domController("img", "portrait", "main-content__photographer-card__portrait", containerDiv.id, this.image).renderDomElement() ;
            nameDiv = domController("div", "name", "main-content__photographer-card__name", containerDiv.id, this.name).renderDomElement();
            locationDiv = domController("div", "location", "main-content__photographer-card__location", containerDiv.id, this.city+", "+this.country).renderDomElement();
            taglineDiv = domController("div", "tagline", "main-content__photographer-card__tagline", containerDiv.id, this.tagline).renderDomElement();
            priceDiv = domController("div", "price", "main-content__photographer-card__price", containerDiv.id, this.price).renderDomElement();
            tagsDiv = domController("div", "tags"+this.id, "main-content__photographer-card__tag-list", containerDiv.id).renderDomElement();
            globalMediaList[0].getTagList(this).forEach( tag => {
                currentTag = domController("div", "tag", "main-content__photographer-card__tag-list__tag", tagsDiv.id, tag).renderDomElement();
            })             
        },
        renderPhotographerPage: function() {
            
            /*domElementCreator.deleteMainContent();*/
            //removing the tag bar since it should no appear on this type of pages
            /*document.getElementById("header__tag-bar").remove(); */
 
            this.renderPhotographerHeader();         

            //Rendering media items on the photographers page            

            globalMediaList[0].renderMediaList(this);
        },
        renderPhotographerHeader: function() {
                //Generate stuff for the header of the photographer page.
                containerDiv = domController("section", this.id, "main-content__photographer-header", "main-content").renderDomElement();

                this.renderBusinessCard();

                
                //creating the contact me button and setting up the event listener
                ContactButton = domController("div", "contact-button", "main-content__photographer-card__contact-button", containerDiv.id, "Contactez-moi").renderDomElement();
                ContactButton.addEventListener("click", () => {
                        document.getElementById("contact-modale").className = "contact-modale"
                        
                        if (document.getElementById("contact-modale__form__contact-label") != undefined) {
                            document.getElementById("contact-modale__form__contact-label").remove();
                            }
                        
                        customContactName = domController("div", "contact-modale__form__contact-name", "contact-modale__form__contact-name", "contact-modale__form", this.name).renderDomElement();

                        //Moving the newly generated photographers name under the contact me Label
                        document.getElementById("contact-modale__form").insertBefore(customContactName, document.getElementById("contact-modale__form__contact-me-label").nextSibling);    
                })


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
                mediaLink: "",
                mediaType: "",
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
                    console.log ("photographer");
                    console.log(photographer);
                //Selecting photographer's media in the globalMediaList
                const photographerMediaList = globalMediaList.filter(media => media.photographerId == photographer.id);

                if (orderBy == undefined) {
                    orderBy = photographer.orderBy;
                    console.log("orderBy was undefined");
                }

                
                
                //Now we are using a switch to order this array of objects according to the orderBy parameter of the method.
                photographerMediaList.sort((a,b) => { 
                    
                    switch (orderBy) {
                        
                        case "Titre":
                            return a.title.localeCompare(b.title);
                        case "Date":
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

                        case "Popularité": 
                            if (a.likes < b.likes) {
                                return 1;
                            }
                            else if (a.likes > b.likes) {
                                return -1;
                            }
                            else{
                                return 0;
                            }
                            default:    


                            return 0;
                    }
                })

                
        
                

                //checking if the medialist has been created already. If this is the first call of this method, then it won't exist, and we'll initialize is here. 
                //If it exists, we clear its content with innerHTML;

                
                console.log("creatingMediaList");
                if (document.getElementById("main-content__media-list") == undefined) {
                    domElementCreator.renderFilterMenu(photographer, orderBy);
                    mediaList = domController("section", "main-content__media-list", "main-content__media-list", "main-content").renderDomElement();
                }
                else
                {
                    console.log("dans le else");
                    document.getElementById("main-content__media-list").remove() ;
                    domElementCreator.renderFilterMenu(photographer, orderBy);
                    mediaList = domController("section", "main-content__media-list", "main-content__media-list", "main-content").renderDomElement();
                }

                

                //To display the total number of likes of the photographer, we count all the likes in its media collection.
                //We extract the likes property into an array, then we use reduce to add up all values.             
                let likesArray = photographerMediaList.map(likesArray => likesArray.likes);
                const totalLikes = likesArray.reduce((a, b)=> a + b,0);
                                console.log(photographerMediaList);
                
                LikesPriceContainer = domController("div", "likes-price__container", "likes-price__container", mediaList.id).renderDomElement();
                totalLikesDiv = domController("div", "likes-price__container__likes", "likes-price__container__likes", LikesPriceContainer.id, totalLikes).renderDomElement();
                priceDiv = domController("div", "likes-price__container__price", "likes-price__container__price", LikesPriceContainer.id, photographer.price).renderDomElement();

                
                
                
                //Then we generate a card for each media in the array

                
                photographerMediaList.forEach (media => {
                    let aMedia;
                    //finding out media-type of the object, and filling the property
                    if (media.image != undefined){
                        media.mediaType = "img";
                        media.mediaLink = media.image;
                    }
                    else if (media.video != undefined){
                        media.mediaType = "video";
                        media.mediaLink = media.video;
                    }
                    console.log("media");
                    console.log(media);
                    

                    mediaContainer = domController("button", "main-content__media-list__media"+media.id, "main-content__media-list__media", mediaList.id).renderDomElement();
                    mediaContainer.tabIndex = 1;
                    mediaContainer.addEventListener("keydown", event => {
                            if (event.key === "Enter" || event.key === " ") {
                                aMedia.renderModale(media, photographerMediaList)
                                //to allow keyboard nav, we are using a "button type" container, and add an event listener for enter and space keys.
                        }
                        
                    
                    });




                    aMedia = domController(media.mediaType, media.id, "main-content__media-list__media__image", mediaContainer.id, media.mediaLink);

                    aMediaDiv = aMedia.renderDomElement();                  
                    aMediaDiv.addEventListener("click", () => {aMedia.renderModale(media, photographerMediaList)});
                    

                    titleContainer = domController("div", "main-content__media-list__media__title-container"+media.id, "main-content__media-list__media__title-container", mediaContainer.id).renderDomElement();
                    title = domController("div", "main-content__media-list__media__title-container__title", "main-content__media-list__media__title-container__title", titleContainer.id, media.title).renderDomElement();
                    likes = domController("div", "main-content__media-list__media__title-container__likes", "main-content__media-list__media__title-container__likes", titleContainer.id, media.likes).renderDomElement();;

                    likes.addEventListener("click", () => {
                            media.likes = media.likes+1;
                            this.renderMediaList(photographer, orderBy);
                            console.log("trying toi add listener on likes");
                    });


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
            photographerMediaList: new Array(0),

            deleteMainContent: function() {
                    //Getting Main Content Children
                    mainContentChildren = document.getElementById("main-content").children;
                    //Turning collection into array.
                    mainContentChildren = Array.prototype.slice.call(mainContentChildren, 0)
                    //Filtering out the main title so it remains on the page
                    /*const contentToActuallyDump = mainContentChildren.filter(content => content.id != "main-content__title");*/

                    //Deleting children.
                    mainContentChildren.forEach(content => {
                            content.remove();
                    })
            },

            renderModale: function(media, photographerMediaList) {

                        
                        this.photographerMediaList = photographerMediaList;
                        console.log(this.photographerMediaList);
                        //finding out right media to link each arrow to. 
                        //We check if we have reached a boudary of the array. If so, we adapt the beahavior of arrows
                        
                        //Settting up a maxIndex value for the array. 
                        //I need to decrease it by 1 for it to point to the right media object. I may have an empty object at the end of the array. Will investigate. 
                        let maxIndex = photographerMediaList.length - 1;
                        
                        if (photographerMediaList.indexOf(media) <= 0) {
                            mediaPrevious = photographerMediaList[maxIndex];
                            mediaNext =     photographerMediaList[photographerMediaList.indexOf(media) +1];    
                        }
                        else if (photographerMediaList.indexOf(media) >= maxIndex) {
                            mediaPrevious = photographerMediaList[photographerMediaList.indexOf(media) -1];
                            mediaNext =     photographerMediaList[0];
                        }
                        else 
                        {
                            mediaPrevious = photographerMediaList[photographerMediaList.indexOf(media) -1];
                            mediaNext = photographerMediaList[photographerMediaList.indexOf(media) +1];
                        }
                        
                        
                
                        
                        //DOM: Creating the "carousel" dom Elements: closebutton, left and right arrows
                        modaleContainer =    domController("div", "modal-viewer", "modal-viewer", "body").renderDomElement();
                        
                        modaleClose =       domController("button", "modal-viewer__close", "modal-viewer__close", modaleContainer.id).renderDomElement();
                        modalePrevious =    domController("button", "modal-viewer__previous", "modal-viewer__nav-arrow modal-viewer__previous", modaleContainer.id).renderDomElement();
                        modaleNext =        domController("button", "modal-viewer__next", "modal-viewer__nav-arrow modal-viewer__next", modaleContainer.id).renderDomElement();

                        //DOM: Adding Event Listerners on the 3 nav buttons
                        modaleClose.addEventListener("click", () => { 
                            this.destroyModale();
                        });

                        modaleClose.addEventListener("keydown", event => { 
                            if (event.code === "Enter" || event.code === " ") {
                            this.destroyModale();}
                        });


                        modalePrevious.addEventListener("click", () => {
                            this.destroyModale();
                            this.renderModale(mediaPrevious, photographerMediaList);
                        });

                        modalePrevious.addEventListener("keydown", event => { 
                            if (event.code === "Enter" || event.code === " ") 
                            {
                            this.destroyModale();
                            this.renderModale(mediaPrevious, photographerMediaList);
                            }
                        });

                        modaleNext.addEventListener("click", () => { 
                            this.destroyModale();
                            this.renderModale(mediaNext, photographerMediaList);
                        });

                        modaleNext.addEventListener("keydown", event => { 
                            if (event.code === "Enter" || event.code === " ") 
                            {
                            this.destroyModale();
                            this.renderModale(mediaNext, photographerMediaList);
                            }
                        });


                        //Giving the Modale window a tabIndex so it can be focused and "capture" the keyboard input.
                        modaleContainer.tabIndex = "0";
                        modaleContainer.focus();


                        //Creating eventListeners for the modale keyboard controls.
                        modaleContainer.addEventListener("keydown", (event) => {
                            if (event.key === "ArrowLeft") {
                                domElementCreator.destroyModale();
                                domElementCreator.renderModale(mediaPrevious, this.photographerMediaList);
                            }        
                            else if (event.key === "ArrowRight") {
                                domElementCreator.destroyModale();
                                domElementCreator.renderModale(mediaNext, this.photographerMediaList);
                            }      

                        })                     
                        
                        //DOM: Adding the current picture in the modale.
                        modalePicture =     domController(media.mediaType, this.elementId, "modal-viewer__media", modaleContainer.id, media.mediaLink ).renderDomElement();

                        modaleContainer.focus();
                },

                previousEventListener: function (e) {
                    console.log(this);
                    
                    if (e.key === "ArrowLeft") {
                        domElementCreator.destroyModale();
                        domElementCreator.renderModale(mediaPrevious, this.photographerMediaList);
                    }
                },

                nextEventListener: function (e) {
                    console.log(this);
                    
                    if (e.key === "ArrowRight") {
                        domElementCreator.destroyModale();
                        domElementCreator.renderModale(mediaNext, this.photographerMediaList);
                    }
                },



                destroyModale: function() {
                    //Pretty self explanatory. Will wipe out the modale. 
                    document.getElementById("modal-viewer").remove();
                },

                //This will render the dropdown menu each time we refresh the media content. 
                //The menu will be dynamically sorted to display the current sort criteria.
                renderFilterMenu: function(photographer, orderBy) {
    
                    //Reordering the filter array to accommodate current sort selection.
                    //Using splice to cut the current filter, and paste it at index 0 of the array.
                    let filters = new Array("Titre", "Popularité", "Date");
                    let cutOut = filters.splice(filters.indexOf(orderBy), 1);
                    filters.splice(0, 0, cutOut[0]);

                //If a menu already exists, then destroy it before rendering the new one
                
                    if (document.getElementById("filter-menu__container") != undefined) {
                    document.getElementById("filter-menu__container").remove();

                };
                    //Creating the structural elements of the menu
                    filterContainer =   domController("div", "filter-menu__container", "filter-menu__container", "main-content").renderDomElement() ;
                    filterLabel =       domController("div", "filter-label", "filter-label", filterContainer.id, "Trier par").renderDomElement() ;
                    filterMenu =        domController("div", "filter-menu", "filter-menu", filterContainer.id).renderDomElement() ;

                    //generating a menu item for each filters[] value
                    filters.forEach(filter => {
                        filterDiv = domController("div", filter, "filter-menu__filter", filterMenu.id, filter).renderDomElement() ;
                       
                        //adding event listener to the menu item.
                        filterDiv.addEventListener("click", () => {
                            globalMediaList[0].renderMediaList(photographer, filter);
                            console.log("eventlistener will be :"+filter );
                        });
                    })
                },

                renderHome: function(selectedTag) {
                        //each time home is rendered, we call the api again (in case site content has been uptdated in the meantime. )
                        //alternatively we could create a initializeData function which would do the "fetching job" and we could call this whenever we want
                        
                        console.log("rendering home");
                        this.deleteMainContent();
                        //Inserting Page Title
                        titleDiv = domController("div","main-content__title", "main-content__title", "main-content", "Nos Photographes").renderDomElement();
                            //Create a Global Media List to be accessed by the PhotoGrapher Object
                       

                       
                        globalMediaList = new Array(0);
                        var photographerList = [];
                        fetch("public/FishEyeData.json").then(response => {
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
                                            if (document.getElementById("header__tag-bar") != undefined) {
                                                document.getElementById("header__tag-bar").remove();
                                                tagBar = domController("div", "header__tag-bar", "header__tag-bar", "header").renderDomElement();
                                            }
                                            else {

                                                tagBar = domController("div", "header__tag-bar", "header__tag-bar", "header").renderDomElement();
                                            }
                                            
                                            globalMediaList[0].getTagList("global").forEach( tag => {
                                                currentTag = domController("div", "tag", "header__tag-bar__tag", "header__tag-bar", tag).renderDomElement();

                                                //addingEventListener on each tag. Will use renderHome with a tag parameter to display only relevant photographs
                                                currentTag.addEventListener("click", () => {
                                                    this.renderHome(tag)});
                                            })
                                        })
                                      

                },
                
                renderDomElement: function() {
                    //Now this will create a dom element using the properties provided when creating the object.
                        //It handles different types of content appropriately (div, article, section, img and video tags)
                        switch (this.elementTag) {
                            case "article":
                            case "div":
                            case "section":
                            case "button":
                                        let newDiv = document.createElement(this.elementTag);
                                        newDiv.id = this.elementId;
                                        newDiv.className = this.elementClass;
                                        document.getElementById(this.elementParent).appendChild(newDiv);
                                        if (this.elementContent) {
                                            newDiv.innerHTML += this.elementContent;
                                            
                                        }
                                        
                                        if (this.elementTag != "div")
                                        {
                                        newDiv.tabIndex = 0;
                                        }
                                        return newDiv;   
                                    break;
                            /*case "button":

                                        let newDiv = document.createElement(this.elementTag);
                                        newDiv.id = this.elementId;
                                        newDiv.className = this.elementClass;
                                        document.getElementById(this.elementParent).appendChild(newDiv);*/


                            case "img":
                            case "video":
                                        let newImg = document.createElement(this.elementTag);
                                        newImg.id = this.elementId;
                                        newImg.className = this.elementClass;
                                        newImg.setAttribute("alt", this.elementContent);
                                        newImg.setAttribute("src", pageUrlBase+"images/small/"+this.elementContent);
                                        
                                        newImg.tabIndex = 0;


                                        console.log(this.elementParent);

                                        document.getElementById(this.elementParent).appendChild(newImg);

                                        //if this a "modale" picture (from carousel component), then we give it bigger size images from the media collection
                                        if (this.elementParent === "modal-viewer") {
                                            
                                            newImg.setAttribute("srcset", pageUrlBase+"images/small/"+this.elementContent+" 800w, "+pageUrlBase+"/images/"+this.elementContent+" 1920w");
                                            newImg.setAttribute("sizes", "80vw");                                        
                                        }

                                        //If this is a video, activate video controls.
                                        if (this.elementTag == "video") {
                                            document.getElementById(newImg.id).controls = true;

                                        
                                        }
                                        return newImg; 

                                    }

                                            
                        }
                        
                }
            
        }