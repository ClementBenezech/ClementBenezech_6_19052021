function createPhotographer (photographerData) {
    return {
      id: photographerData.id,
      name: photographerData.name,
      city: photographerData.city,
      country: photographerData.country,
      tags: photographerData.tags,
      tagline: photographerData.tagline,
      price: photographerData.price,
      portrait: photographerData.portrait,
      renderCard: function () {

        containerDiv = this.createDomElement("div", this.id, "main-content__photographer-card", "main-content");
        portraitDiv = this.createDomElement("img", "portrait", "main-content__photographer-card__portrait", containerDiv.id, this.portrait) ;
        nameDiv = this.createDomElement("div", "name", "main-content__photographer-card__name", containerDiv.id, this.name) ;
        locationDiv = this.createDomElement("div", "location", "main-content__photographer-card__location", containerDiv.id, this.city+", "+this.country);
        taglineDiv = this.createDomElement("div", "tagline", "main-content__photographer-card__tagline", containerDiv.id, this.tagline);
        priceDiv = this.createDomElement("div", "price", "main-content__photographer-card__price", containerDiv.id, this.price);               
        console.log("Artist name is"+this.name+" and his tagline is "+this.tagline);
      },
      createDomElement: function(elementTag, elementId, elementClass, elementParent, elementContent) {
      //Will create a dom element to render the specified property of photographer on the main page  
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
                        var newImg = document.createElement(elementTag);
                        newImg.id = elementId;
                        newImg.className = elementClass;
                        newImg.setAttribute("src", "./../public/images/id/"+this.portrait );
                        
                        document.getElementById(elementParent).appendChild(newImg);
                    break;
        }
            return newDiv;  
     }
    };
  }

//Appel du fichier JSON contenant les données à afficher sur le site
fetch('./public/FishEyeData.json').then(response => {
    return response.json();
  }).then(data => {
    data['photographers'].forEach(photographer => {
        var currentPhotographer = createPhotographer (photographer);
        currentPhotographer.renderCard();
    })
  }).catch(err => {
    console.log("whoops! An error occured while fetching the FishEyeData.json file")
  });