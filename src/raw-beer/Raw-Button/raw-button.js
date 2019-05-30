"use strict";

import { AttributeSelector, setStyle } from "../Raw-Functions/AtrributeFunctions.js";

const template = document.createElement("template");
template.innerHTML = `

<button> Im a Button </button>
`;

/**
 * A vanilla web-component
 */
class BeerButton extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({"mode" : "open"});
        
        // this is the piece of code that takes all that html stuff up top and makes 
        // it visible
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$beerButton = this._shadowRoot.querySelector("button");
        this.$rawButton = document.querySelector("beer-button");
        
        // So in order to use bind(this) which means I have access to all the variables here I need to 
        // implement like so
        
        this.AttributeSelector = AttributeSelector.bind(this);
        this.AttributeSelector();
        
    }
    
    /**
     * @description Takes a script and function then loads the function from 
     * the script so that it can be used with the button
     * @returns void
     * @example 
     * 
     * <beer-button script="./testFunction.js" functionName="testFunction"></beer-button>
     * 
     */    
    customFunction(){
        var scriptName = this.getAttribute("script");
        var functionName = this.getAttribute("functionName");  
        if(scriptName.length > 0){            
            import(scriptName).then(script =>{
                script[functionName]();
            }).catch(err => {
                return err.message;
            });
        }
    }

        
    /**
     * @description Takes a link and when the button is clicked will navigate 
     * the browser to the new link. Has the optional attribute "tab" to allow users
     * to open a new tab instead.
     * @returns void
     * @example <beer-button link="www.google.com"></beer-button>
     * @example <beer-button link="www.google.com" tab></beer-button>
     */
    
    linkFunction(){
        // grabs the value of link 
        var linkValue = this.getAttribute("link");
        if( linkValue.length <= 0 ){
            throw "Invalid Link";
        }
        else{
            // navigates the browser to a new webpage
            if(this.hasAttribute("tab")){
                // Opens a new tab instead of loading the link on the current tab
                var win = window.open(linkValue, "_blank");
                // Focuses onto the new tab
                win.focus();
            }
            else {
                // Loads the link on the current tab
                window.location.href = linkValue;
            }
        }
    }

    /**
     * @description Function that allows the user to increment a selected field 
     * @param value boolean when true increments when false decrements
     * @returns void 
     * @example 
     * 
     * <beer-button increment="increment-number"></beer-button>
     * <beer-button increment="decrement-number"></beer-button>
     * <form>
     *      <input type="text" id="increment-number" value="0"/>
     *      <input type="text" id="decrement-number" value="0"/>
     * </form>                
     *                
     */
    incrementDecrementFunction(){
        var value;
        if(this.inc){
            var incrementId = this.getAttribute("increment");
            // check to see if the value not null
            if( incrementId <= 0 ){
                throw "Invalid input";
            }
            else{
            // take the field and parse it into an integer and then perform the 
            // increment operation on that returned value and then set this as 
            // the new value 
                value = parseInt(document.getElementById(incrementId).value, 10);
                value ++;
                document.getElementById(incrementId).value = value;
            }
        }
        else{
            // grabs the attribute value
            var decrementId = this.getAttribute("decrement");
            // check to see if the value not null
            if( decrementId <= 0 ){
                throw "Invalid input";
            }
            // take the field and parse it into an integer and then perform 
            // the decrement operationon that returned value and then set this 
            // as the new value 
            value = parseInt(document.getElementById(decrementId).value, 10);
            value --;
            document.getElementById(decrementId).value = value;
        }
    }

    
    /**
     * @description Function that allows the user to change the background color of the button
     * @returns void
     * @example
     * 
     * <beer-button color="red">Red Button</beer-button>
     * 
     */
    changeColorOfBackground(){
        // grab the attribute color
        var color = this.getAttribute("color");
        // Set the color
        console.log("Color button Check");
        this._shadowRoot.querySelector("button").style.backgroundColor = color;
        
    }
   
   
    /**
     * @description Function that sets the background of the component to be an img
     * @param {string} img The string of the img file to be imported
     * @returns void
     * @example
     * 
     * <beer-button image="test.jpg">Image Button</beer-button>
     * 
     */
    setImgAsBackground(){
        // You get the attribute image as a string here; it's basically the img url
        var image = this.getAttribute("image");
        // Set the image as a background using the Background-Img CSS property
        // The trick here is to remember that backgroundImage wants a url, not a string of the path
        // Syntax is tricky aswell: "url(image)" doesn't work because it doesn't recognize image as
        // a proper var. That's why you put empty strings and "add" image to it so it will get it as a var
        this._shadowRoot.querySelector("button").style.backgroundImage = "url("+image+")";
    }


    /**
     * @description Function which allows the user to use one of our built in styles 
     * @param {string} styleName takes a string that the user provides and then matches
     * it against a .css stylesheet stored in the componenets library 
     * @returns void
     */    
    libStyle(styleName){
        if(styleName == "block"){
            setStyle("../Raw-Button/ButtonStyles/block.css", this._shadowRoot);
        }
        if(styleName == "border"){
            setStyle("../Raw-Button/ButtonStyles/border.css", this._shadowRoot);
        }
        if(styleName == "danger"){
            setStyle("../Raw-Button/ButtonStyles/danger.css", this._shadowRoot);
        }
        if(styleName == "disable"){
            setStyle("../Raw-Button/ButtonStyles/disable.css", this._shadowRoot);
        }
        if(styleName == "hoverButton"){
            setStyle("../Raw-Button/ButtonStyles/hoverButton.css", this._shadowRoot);
        }
        if(styleName == "info"){
            setStyle("../Raw-Button/ButtonStyles/info.css", this._shadowRoot);
        }
        if(styleName == "link"){
            setStyle("../Raw-Button/ButtonStyles/link.css", this._shadowRoot);
        }
        if(styleName == "medium"){
            setStyle("../Raw-Button/ButtonStyles/medium.css", this._shadowRoot);
        }
        if(styleName == "primary"){
            setStyle("../Raw-Button/ButtonStyles/primary.css", this._shadowRoot);
        }
        if(styleName == "round"){
            setStyle("../Raw-Button/ButtonStyles/round.css", this._shadowRoot);
        }
        if(styleName == "small"){
            setStyle("../Raw-Button/ButtonStyles/small.css", this._shadowRoot);
        }
        if(styleName == "success"){
            setStyle("../Raw-Button/ButtonStyles/success.css", this._shadowRoot);
        }
        if(styleName == "warning"){
            setStyle("../Raw-Button/ButtonStyles/warning.css", this._shadowRoot);
        }
        if(styleName == "xsmall"){
            setStyle("../Raw-Button/ButtonStyles/xsmall.css", this._shadowRoot);
        }
        if(styleName == "large"){
            setStyle("../Raw-Button/ButtonStyles/large.css", this._shadowRoot);
        }
    }
    
}
window.customElements.define("beer-button", BeerButton);
