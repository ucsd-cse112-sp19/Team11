"use strict";

const template = document.createElement("template");
template.innerHTML = `
<nav>
</nav>
`;

/**
 * @description A class which contains the beer-nav web component has the following attributes: id, 
 * beerclass, beertype, newStyle, libStyle, navBarID, divID, divClass, navBarBrandId
 * <beer-navbar> </beer-navbar>
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
        this.AttributeSelector();
        
        var getBrand = this.getBrand.bind(this);
        getBrand();
        
        this.$beerDiv = document.createElement("div");
        this.$beerNav.appendChild(this.$beerDiv);

       
        var getButtons = this.getButtons.bind(this);
        getButtons();

        var getLitButtons = this.getLitButtons.bind(this);
        getLitButtons();

        var getRegButtons = this.getRegButtons.bind(this);
        getRegButtons();

        
       
    }  

    /**
     * @description Function that adds a beer-brand component to the above template by 
     * appending it to the nav element      
     * @example
     * <nav>
     *  <beer-brand>
     * <nav>
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
                else if(navBarBrandID.length == 0 && currBrand.getAttribute("navBarBrandID").length == 0){
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
     * @description This function takes all the beer-buttons web componets that the user 
     * has placed within the html with the correct attribute values (navBarid)
     * and appends them to the div element in the 
     * above template
     * @example
     * 
     * <nav>
     *  <div>
     *    <beer-button></beer-button>
     *  <div>
     * </nav>
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
                else if(navBarID.length == 0 && currBeerButton.getAttribute("navBarID").length == 0){
                    this._shadowRoot.getElementById("nav").appendChild(currBeerButton);
                    // now because beerButton is shrinking when I append the element
                    // I need to decrement i so that it holds its currValue and
                    // I dont miss a beer-button  
                    i--;
                }     
            }
        }
    }


    /**
     * @description This function takes all the buttons  that the user 
     * has placed within the html with the correct attribute values (navBarid)
     * and appends them to the div element in the 
     * above template
     * @example
     * 
     * <nav>
     *  <div>
     *    <button></button>
     *  <div>
     * </nav>
     */
    getRegButtons(){
        // beerButtons is a variable that holds all the beer-buttons that were placed on the
        // page.

        var beerButtons = document.getElementsByTagName("button");
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
                else if(navBarID.length == 0 && currBeerButton.getAttribute("navBarID").length == 0){
                    this._shadowRoot.getElementById("nav").appendChild(currBeerButton);
                    // now because beerButton is shrinking when I append the element
                    // I need to decrement i so that it holds its currValue and
                    // I dont miss a beer-button  
                    i--;
                }     
            }
        }
    }

    /**
     * @description This function takes all the beer-buttons-lit web componets that the user 
     * has placed within the html with the correct attribute values (navBarid)
     * and appends them to the div element in the 
     * above template
     * @example
     * 
     * <nav>
     *  <div>
     *    <beer-button-lit></beer-button-lit>
     *  <div>
     * </nav>
     */
    getLitButtons(){
        // beerButtons is a variable that holds all the beer-buttons that were placed on the
        // page.
        var beerButtons = document.getElementsByTagName("beer-button-lit");
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
                else if(navBarID.length == 0 && currBeerButton.getAttribute("navBarID").length == 0){
                    this._shadowRoot.getElementById("nav").appendChild(currBeerButton);
                    // now because beerButton is shrinking when I append the element
                    // I need to decrement i so that it holds its currValue and
                    // I dont miss a beer-button  
                    i--;
                }     
            }
        }
    }


    /**
    * @description Function that helps with reading the attributes from the WebComponent 
    */
    AttributeSelector(){
    
        if(this.hasAttribute("id")){
            if(this.hasAttribute("beerId")){
                this.$beerNav.setAttribute("id", this.getAttribute("beerId"));
            }
            this.$beerNav.setAttribute("id", this.getAttribute("id"));         
        }
        
        // allows the user to add the class attribute to the <nav> element so the 
        // user can use it for styling
        if(this.hasAttribute("beerclass")){
            if(this.getAttribute("beerclass").length > 0){
                this.$beerNav.setAttribute("class", this.getAttribute("beerclass"));
            }
            else{
                console.log("The class field is set to empty");
            }
        }
        
        // allows the user to use the type attribute for css styling by being able to add it
        // to a <nav>
        if(this.hasAttribute("beertype")){
            if(this.getAttribute("beertype").length > 0){
                this.$beerNav.setAttribute("type", this.getAttribute("beertype"));
            }
        }
        // statement to control the flow of style so that newStyle has priority over
        // libstyle
        if(this.hasAttribute("newStyle") || this.hasAttribute("libStyle")){
        // checks for a style and if it exists imports a .css style sheet
            if(this.hasAttribute("newStyle")){
                this.setStyle(this.getAttribute("newStyle"), this._shadowRoot);
            }

            else if(this.hasAttribute("libStyle")){
                this.libStyle(this.getAttribute("libStyle"));
            }
        }

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

        if(this.hasAttribute("bootstrap")){
            this.setBootStrap();
        }
    }


    /**
     * @description Function that allows the user to apply the bootstrap styles to the component
     * by appending the scripts and link to the template above as 
     * @example
     * <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
     * <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
     * <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
     * <a>
     * <img>
     * </a>
     */
    setBootStrap(){
        // creating a <link> on the template above and then attaching it to it
        var bootstrapcss = document.createElement("link");
        this._shadowRoot.appendChild(bootstrapcss);

        // setting all the attributes for the above link so that the stylesheet from bootstrap is pulled in
        bootstrapcss.setAttribute("rel", "stylesheet");
        bootstrapcss.setAttribute("href", "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css");
        bootstrapcss.setAttribute("integrity", "sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T");
        bootstrapcss.setAttribute("crossorigin", "anonymous"); 
        bootstrapcss.setAttribute("type", "text/css");

        
        var bootstrapquery = document.createElement("script");
        this._shadowRoot.appendChild(bootstrapquery);

        // pretty much the same as above except here a script is having its attributes set 
        bootstrapquery.setAttribute("src", "https://code.jquery.com/jquery-3.3.1.slim.min.js");
        bootstrapquery.setAttribute("integrity", "sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo");
        bootstrapquery.setAttribute("crossorigin", "anonymous"); 
        

        var bootstrappopper = document.createElement("script");
        this._shadowRoot.appendChild(bootstrappopper);
        bootstrappopper.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js");
        bootstrappopper.setAttribute("integrity", "sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1");
        bootstrappopper.setAttribute("crossorigin", "anonymous"); 

        var bootstrapjs = document.createElement("script");
        this._shadowRoot.appendChild(bootstrapjs);
        bootstrapjs.setAttribute("src", "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js");
        bootstrapjs.setAttribute("integrity", "sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM");
        bootstrapjs.setAttribute("crossorigin", "anonymous");  
    }

    /**
     * @description Function that allows for a custom style sheet to be applied
     * @param {string} newStyle string that is the .css file to be imported
     * @example
     * 
     * <link rel="stylesheet" href="newStyle" type="text/css"></link>
     * 
     */
    setStyle(newStyle, shadowRoot){
        var Style = document.createElement("link");
        shadowRoot.appendChild(Style);
        Style.setAttribute("rel", "stylesheet");
        Style.setAttribute("href", newStyle);
        Style.setAttribute("type", "text/css");
    }
}
window.customElements.define("beer-navbar", BeerNav);