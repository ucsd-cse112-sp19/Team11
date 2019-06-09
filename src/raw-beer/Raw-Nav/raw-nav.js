"use strict";
import {AttributeSelector, setStyle} from "../Raw-Functions/NavBarFunctions.js";

const template = document.createElement("template");
template.innerHTML = `
<nav>
</nav>
`;

/**
 * @description Web-Component that functions as a navigation bar. 
 * Can be linked with beer-button and beer-nav components
 * 
 */
class BeerNav extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({"mode" : "open"});
        
        // this is the piece of code that takes all that html stuff up top and makes 
        // it visible
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$beerNav = this._shadowRoot.querySelector("nav");
        this.$rawNav= document.querySelector("beer-navbar");  
        
        // This is the same as before Im making it so that all the variables here 
        // are available to Attribute Selector 
        this.AttributeSelector = AttributeSelector.bind(this);
        this.AttributeSelector();
        
        var getBrand = this.getBrand.bind(this);
        getBrand();

       

        this.$beerDiv = document.createElement("div");
        this.$beerNav.appendChild(this.$beerDiv);

       
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
     * @description When this function is called it gets a beer-brand element from the DOM 
     * and then adds it to the navBar by checking to see if the beer-brand and beer-navbar 
     * have the same navBarBrandid attribute if they do then the beer-brand is then brought connected to the beer-navBar     * @example
     * TODO: the below needs to be tested
     * <beer-navbar navBarBrandID="beer"></beer-navbar>  
     * <beer-brand navBarBrandID="beer"></beer-brand> 
     */
    getBrand(){
        var beerbrands = document.getElementsByTagName("beer-brand");
        var navBarBrandID = this.getAttribute("navBarBrandID");

        for(var i = 0; i < beerbrands.length; i++){
            var currBrand = beerbrands[i];

            if(currBrand.hasAttribute("navBarBrandID") && this.hasAttribute("navBarBrandID")){
                // this if statement is checking to see if the ID the user has provided for 
                // the beer-button and beer-navbar are the same if they are then the beer-button
                // is added to the beer-navbar
                if(currBrand.getAttribute("navBarBrandID") == navBarBrandID){   
                    this.$beerNav.appendChild(currBrand);
                    // now because beerButton is shrinking when I append the element
                    // I need to decrement i so that it holds its currValue and
                    // I dont miss a beer-button  
                    i--;
                }
                // this if statement checks if the user has added an actual value to navBarID 
                // if they have left it blank and there is a beer-button with blank navBarID
                // then it will be added to the beer-navBar
                if(navBarBrandID.length == 0 && currBrand.getAttribute("navBarBrandID").length == 0){
                    this.$beerNav.appendChild(currBrand);
                    // now because beerButton is shrinking when I append the element
                    // I need to decrement i so that it holds its currValue and
                    // I dont miss a beer-button  
                    i--;
                }     
            }

        }
    }


    /**
     * @description This function takes all the beer-buttons that the user 
     * has placed within the html and inserts them into the proper navBar 
     * bassed on the navBarID attribute.
     * @example
     * 
     * <beer-button navBarID="bill"></beer-button>
     * <beer-button navBarID="bill" id="heello" beerId="d" beerClass="btn btn-outline-success"  newStyle="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"  >Page 4</beer-button>
     * <beer-navbar  navBarId="bill" ></beer-navbar>  
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