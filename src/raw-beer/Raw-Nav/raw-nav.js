"use strict";
import {AttributeSelector, setStyle} from "../Raw-Functions/NavBarFunctions.js";
import "../Raw-Button/raw-button.js";

const template = document.createElement("template");
template.innerHTML = `
<nav>
<div>
</div>
</nav>
`;

/**
 * A vanilla web-component
 */
class BeerNav extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({"mode" : "open"});
        
        // this is the piece of code that takes all that html stuff up top and makes 
        // it visible
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$beerNav = this._shadowRoot.querySelector("nav");
        this.$beerDiv = this._shadowRoot.querySelector("div");
        this.$rawNav= document.querySelector("beer-navbar");  
        
        // This is the same as before Im making it so that all the variables here 
        // are available to Attribute Selector 
        this.AttributeSelector = AttributeSelector.bind(this);
        this.AttributeSelector();
        
        var getButtons = this.getButtons.bind(this);
        getButtons();

        if(this.hasAttribute("divId")){
            if(this.getAttribute("divID").length > 0){
                this.$beerDiv.setAttribute("id", this.getAttribute("divID"));
            }
        }
        if(this.hasAttribute("divClass")){
            if(this.getAttribute("divClass").length > 0){
                this.$beerDiv.setAttribute("class", this.getAttribute("divClass"));
            }
        }
       
    }  


    /**
     * @description This function takes all the beer-buttons that the user has placed within the html and inserts them
     * into the proper navBar bassed on the navBarID attribute.
     */
    getButtons(){
        // beerButtons is a variable that holds all the beer-buttons that were placed on the
        // page.
        var beerButtons = document.getElementsByTagName("beer-button");
        var navBarID = this.getAttribute("navBarID");
        for(var i =0 ; i < beerButtons.length; i++){
            var currBeerButton = beerButtons[i];
            // check to see if both the beer-button and beer-nav have valid attributes 
            if(currBeerButton.hasAttribute("navBarID") && this.hasAttribute("navBarID")){
                // this if statement is checking to see if the ID the user has provided for 
                // the beer-button and beer-navbar are the same if they are then the beer-button
                // is added to the beer-navbar
                if(currBeerButton.getAttribute("navBarID") == navBarID){   
                    this.$beerDiv.appendChild(currBeerButton);
                    // now because beerButton is shrinking when I append the element
                    // I need to decrement i so that it holds its currValue and
                    // I dont miss a beer-button  
                    i--;
                }
                // this if statement checks if the user has added an actual value to navBarID 
                // if they have left it blank and there is a beer-button with blank navBarID
                // then it will be added to the beer-navBar
                if(navBarID.length == 0 && currBeerButton.getAttribute("navBarID").length == 0){
                    this._shadowRoot.getElementById("nav").appendChild(currBeerButton);
                    // now because beerButton is shrinking when I append the element
                    // I need to decrement i so that it holds its currValue and
                    // I dont miss a beer-button  
                    i--;
                }     
            }
        }
    }

    addBrand(){
        
    }

}
window.customElements.define("beer-navbar", BeerNav);