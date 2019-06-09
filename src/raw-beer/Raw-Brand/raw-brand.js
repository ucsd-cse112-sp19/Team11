"use strict";
import {AttributeSelector} from "../Raw-Functions/BrandbarFunctions.js";



const template = document.createElement("template");
template.innerHTML = `
<a>
<img width="30" height="30">
</a>

`;

/**
 * Web-Component that functions as a button with the appearance of a given image. Can be linked with beer-nav.
 * 
 */
class BeerBrand extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({"mode" : "open"});
        
        // this is the piece of code that takes all that html stuff up top and makes 
        // it visible
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$beerA = this._shadowRoot.querySelector("a");
        this.$beerImg = this._shadowRoot.querySelector("img");
        this.$rawBrand = document.querySelector("beer-brand");

        console.log("yooooo + " + this.innerHTML);



        this.AttributeSelector = AttributeSelector.bind(this);
        this.AttributeSelector();




        if(this.hasAttribute("id")){
            if(this.getAttribute("id").length > 0){
                var setBrandName = this.setBrandName.bind(this);
                setBrandName();
            }
        }
    
        // if statement that checks if the brandHref attribute has been applied by the user
        // if it has then a check is made to make sure the attribute is not null
        if(this.hasAttribute("brandHref")){
            if(this.getAttribute("brandHref").length > 0){
                // sets the href attribute for <a> in the shadowdom
                this.$beerA.setAttribute("href", this.getAttribute("brandHref"));
            }
        }

        // if statement that checks if the user has used the brandImage attribute and 
        // then checks if that attribute is not null if its been supplied
        if(this.hasAttribute("brandImage")){
            if(this.getAttribute("brandImage").length > 0){
                this.setBrandImage();
            }
        }

        if(this.hasAttribute("brandHeight")){
            if(this.getAttribute("brandHeight").length > 0){
                this.$beerImg.setAttribute("height", this.getAttribute("brandHeight"));
            }
        }

        if(this.hasAttribute("brandWidth")){
            if(this.getAttribute("brandWidth").length > 0){
                this.$beerImg.setAttribute("width", this.getAttribute("brandWidth"));
            }
        }

        if(this.hasAttribute("imageClass")){
            if(this.getAttribute("imageClass").length > 0){
                this.$beerImg.setAttribute("class", this.getAttribute("imageClass"));
            }
        }

        if(this.hasAttribute("imageAlt")){
            if(this.getAttribute("imageAlt").length > 0){
                this.$beerImg.setAttribute("alt", this.getAttribute("imageAlt"));
            }
        }

    }


    /**
     * Function that sets the image for the brand
     */
    setBrandImage(){
        // You get the attribute brandImage as a string here; it's basically the path
        var image = this.getAttribute("brandImage");
        var altImg = this.getAttribute("imageAlt");
        console.log(image);
        if(this.doesFileExist(image)){
            this.$beerImg.setAttribute("src", image);
        }
        else if(this.doesFileExist(altImg)){
            console.log("There is a problem with the path provided to brandImage");
            this.$beerImg.setAttribute("src", altImg);
        }
        else{
            console.log("The image path for brandImage and imageAlt (if imageAlt was also used) is incorrect");
        }
    }


    /**
     * @description This function is used to check if a file exists on the system 
     * @deprecated
     * @param {*} urlToFile pass the url of the file to the function so that it can check 
     * if the file is a valid file on the system
     * @return true if the file file is found
     * @reutnr false if the file is not found
     */
    doesFileExist(urlToFile) {
        console.log(urlToFile);
        var xhr = new XMLHttpRequest();
        
        xhr.open("HEAD", urlToFile, false);
        xhr.send();
         
        if (xhr.status == "404") {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Sets the name of the brand image
     */
    setBrandName(){
        // grabs the correct brand that corresponds with the Id
        if(this.innerHTML.length > 0){
            this.$beerA.append(this.innerHTML);
        }
        else{
            console.log( "no Name provided");
        }
    }

}
window.customElements.define("beer-brand", BeerBrand);