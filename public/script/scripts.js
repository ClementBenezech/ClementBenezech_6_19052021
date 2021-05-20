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
      renderPhotographerHeader: function() {
                //Generate stuff for the header of the photographer page.
                console.log("header has been rendered, yooohoooh");

                containerDiv = this.createDomElement("div", this.id, "main-content__photographer-header", "main-content");
        
                containerDiv.addEventListener("click", () => {
                this.renderPhotographerPage();
        })
                portraitDiv = this.createDomElement("img", "portrait", "main-content__photographer-card__portrait", containerDiv.id, this.image) ;
                nameDiv = this.createDomElement("div", "name", "main-content__photographer-card__name", containerDiv.id, this.name) ;
                locationDiv = this.createDomElement("div", "location", "main-content__photographer-card__location", containerDiv.id, this.city+", "+this.country);
                taglineDiv = this.createDomElement("div", "tagline", "main-content__photographer-card__tagline", containerDiv.id, this.tagline);
                priceDiv = this.createDomElement("div", "price", "main-content__photographer-card__price", containerDiv.id, this.price);
                tagsDiv = this.createDomElement("div", "tags"+this.id, "main-content__photographer-card__tag-list", containerDiv.id);
                this.tags.forEach( tag => {
                currentTag = this.createDomElement("div", "tag", "main-content__photographer-card__tag-list__tag", tagsDiv.id, tag);
                console.log ("On crée le tag "+tag+" dans la div "+tagsDiv.id);
        })             
      },
      renderPhotographerPage: function() {
                //Génère la page photographer. Fait appel à rendermediaList pour le contenu media.
                
                this.deleteMainContent();    
                this.renderPhotographerHeader();         

                //Rendu de la liste de médias.

                this.renderMediaList();
      },
      renderMediaList: function () {
                //Selecting photographer's media in the globalMediaList
                const photographerMediaList = globalMediaList.filter(media => media.photographerId == this.id);

                //Create each media to populate the photographer's page;
                photographerMediaList.forEach (media => {
                    console.log(media.image);
                    if (media.image != undefined){
                        currentMedia = this.createDomElement("img", "media"+media.id, "main-content__media-list__media", "main-content", media.image) ;
                    }
                    else if (media.video != undefined){
                        currentMedia = this.createDomElement("video", "media"+media.id, "main-content__media-list__media", "main-content", media.video) ;
                    }
                })
      }, 
      
      renderCard: function () {

        containerDiv = this.createDomElement("div", this.id, "main-content__photographer-card", "main-content");
        
        containerDiv.addEventListener("click", () => {
                this.renderPhotographerPage();
        })

        portraitDiv = this.createDomElement("img", "portrait", "main-content__photographer-card__portrait", containerDiv.id, this.image) ;
        nameDiv = this.createDomElement("div", "name", "main-content__photographer-card__name", containerDiv.id, this.name) ;
        locationDiv = this.createDomElement("div", "location", "main-content__photographer-card__location", containerDiv.id, this.city+", "+this.country);
        taglineDiv = this.createDomElement("div", "tagline", "main-content__photographer-card__tagline", containerDiv.id, this.tagline);
        priceDiv = this.createDomElement("div", "price", "main-content__photographer-card__price", containerDiv.id, this.price);
        tagsDiv = this.createDomElement("div", "tags"+this.id, "main-content__photographer-card__tag-list", containerDiv.id);
        this.tags.forEach( tag => {
            currentTag = this.createDomElement("div", "tag", "main-content__photographer-card__tag-list__tag", tagsDiv.id, tag);
            console.log ("On crée le tag "+tag+" dans la div "+tagsDiv.id);
        })             
        console.log("Artist name is"+this.name+" and his tagline is "+this.tagline);
      },
      createDomElement: function(elementTag, elementId, elementClass, elementParent, elementContent) {
      //Will create a dom element to render the specified element on the page
        switch (elementTag) {
            case "div":
                        var newDiv = document.createElement(elementTag);
                        newDiv.id = elementId;
                        newDiv.className = elementClass;
                        document.getElementById(elementParent).appendChild(newDiv);
                        if (elementContent) {
                            newDiv.innerHTML += elementContent;
                        }
                    break;
            case "img":
            case "video":
                        var newImg = document.createElement(elementTag);
                        newImg.id = elementId;
                        newImg.className = elementClass;
                        newImg.setAttribute("src", "public/images/"+elementContent );
                        
                        document.getElementById(elementParent).appendChild(newImg);
                    break;
                    }

            return newDiv;  
    }
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
                }
        
            }
    }



    

//Appel du fichier JSON contenant les données à afficher sur le site
fetch('./public/FishEyeData.json').then(response => {
    return response.json();

            }).then(data => {  

                globalMediaList = new Array(0);
                data['media'].forEach(media => {
                var currentMedia = createMedia (media);
                globalMediaList.push(currentMedia);
                })
                
                data['photographers'].forEach(photographer => {
                var currentPhotographer = createPhotographer (photographer);
                currentPhotographer.renderCard();
                /*currentPhotographer.renderPhotographerPage();*/
                })

                

            }).then(data => {
                console.log(globalMediaList);

           })








//Appel du fichier JSON contenant les données à afficher sur le site
/*fetch('./public/FishEyeData.json').then(response => {
    return response.json();

        }).then(data => {

        globalMediaList = new Array(0);
        
        data['photographers'].forEach(photographer => {
            var currentPhotographer = createPhotographer (photographer);
            currentPhotographer.renderCard();
        })
        data['media'].forEach(media => {
            var currentMedia = createMedia (media);
            globalMediaList.push(currentMedia);
        } )
    console.log(globalMediaList);
    globalMediaList.forEach(media => {
    media.renderMedia();
    currentPhotographer.renderMediaList(globalMediaList);
    })
  }).catch(err => {
    console.log("whoops! An error occured while fetching the FishEyeData.json file")
  });*/

  