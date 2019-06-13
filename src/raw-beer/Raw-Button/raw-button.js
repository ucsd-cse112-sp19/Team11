"use strict";

const template = document.createElement("template");
template.innerHTML = `

<button> Im a Button </button>
`;

/**
 * A Web component which acts as a button with a couple of features built in such as the abiltiy
 * to increment/decrement a field and accept a custom user defined function. it accepts the following
 * attributes: link, disable, increment, decrement, script, functionName, id, newStyle, color, image, 
 * libStyle
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
        
        this.AttributeSelector();
        
    }

    /**
     * @description Takes a script and function then loads the function from 
     * the script so that it can be used with the button
     * @returns void
     * @example 
     * 
     * <beer-button script="./testFunction.js" functionName="testFunction"></beer-button>
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
            this.setStyle("../Raw-Button/ButtonStyles/block.css", this._shadowRoot);
        }
        if(styleName == "border"){
            this.setStyle("../Raw-Button/ButtonStyles/border.css", this._shadowRoot);
        }
        if(styleName == "danger"){
            this.setStyle("../Raw-Button/ButtonStyles/danger.css", this._shadowRoot);
        }
        if(styleName == "disable"){
            this.setStyle("../Raw-Button/ButtonStyles/disable.css", this._shadowRoot);
        }
        if(styleName == "hoverButton"){
            this.setStyle("../Raw-Button/ButtonStyles/hoverButton.css", this._shadowRoot);
        }
        if(styleName == "info"){
            this.setStyle("../Raw-Button/ButtonStyles/info.css", this._shadowRoot);
        }
        if(styleName == "link"){
            this.setStyle("../Raw-Button/ButtonStyles/link.css", this._shadowRoot);
        }
        if(styleName == "medium"){
            this.setStyle("../Raw-Button/ButtonStyles/medium.css", this._shadowRoot);
        }
        if(styleName == "primary"){
            this.setStyle("../Raw-Button/ButtonStyles/primary.css", this._shadowRoot);
        }
        if(styleName == "round"){
            this.setStyle("../Raw-Button/ButtonStyles/round.css", this._shadowRoot);
        }
        if(styleName == "small"){
            this.setStyle("../Raw-Button/ButtonStyles/small.css", this._shadowRoot);
        }
        if(styleName == "success"){
            this.setStyle("../Raw-Button/ButtonStyles/success.css", this._shadowRoot);
        }
        if(styleName == "warning"){
            this.setStyle("../Raw-Button/ButtonStyles/warning.css", this._shadowRoot);
        }
        if(styleName == "xsmall"){
            this.setStyle("../Raw-Button/ButtonStyles/xsmall.css", this._shadowRoot);
        }
        if(styleName == "large"){
            this.setStyle("../Raw-Button/ButtonStyles/large.css", this._shadowRoot);
        }
        if(styleName == "brand"){
            this.setStyle("../Raw-Button/ButtonStyles/brand.css", this._shadowRoot);
        }
    }


    /**
    * Function that helps with selecting attributes
    * 
    */
    AttributeSelector(){
    
        if(this.hasAttribute("id")){
            if(this.hasAttribute("beerId")){
                this.setButtonName(this.getAttribute("id"), this.$beerButton);
                this.$beerButton.setAttribute("id", this.getAttribute("beerId"));
            }
            this.setButtonName(this.getAttribute("id"), this.$beerButton);
            this.$beerButton.setAttribute("id", this.getAttribute("id"));         
        }
        
        if(this.hasAttribute("beerclass")){
            if(this.getAttribute("beerclass").length > 0){
                this.$beerButton.setAttribute("class", this.getAttribute("beerclass"));
            }
            else{
                console.log("The class field is set to empty");
            }
        }
        if(this.hasAttribute("beertype")){
            if(this.getAttribute("beertype").length > 0){
                this.$beerButton.setAttribute("type", this.getAttribute("beertype"));
            }
        }
        
        if(this.hasAttribute("color")){
            this.changeColorOfBackground();
        }

        if(this.hasAttribute("image")){
            this.setImgAsBackground();
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


        // if statement that only runs if the disable attribute is not present 
        if(!this.hasAttribute("disable")){
            if(this.hasAttribute("link")){
                this.$beerButton.addEventListener("click", this.linkFunction.bind(this));
            }
            else if(this.hasAttribute("increment")){
                // checks a value as true to be used when the incremenetDecrement Function is called
                // Then adds a listioner for a click which calls the function
                this.inc = true;
                this.$beerButton.addEventListener("click", this.incrementDecrementFunction.bind(this));
            }
            else if(this.hasAttribute("decrement")){
                // checks a value as true to be used when the incremenetDecrement Function is called
                // Then adds a listioner for a click which calls the function
                this.inc = false;
                this.$beerButton.addEventListener("click", this.incrementDecrementFunction.bind(this));
            }
            else if(this.hasAttribute("script") && this.hasAttribute("functionName")){
                this.$beerButton.addEventListener("click", this.customFunction.bind(this));
            }
        }
        else{
            this.setStyle("./ButtonStyles/disable.css", this._shadowRoot);
        }

        if(this.hasAttribute("bootstrap")){
            this.setBootStrap();
        }

    } 

    /**
     * @description Function that sets up access to bootstrap styles
     * @example 
     * <beer-button bootstrap>Bootstrap Button</beer-button>
     */
    setBootStrap(){
        var bootstrapcss = document.createElement("link");
        this._shadowRoot.appendChild(bootstrapcss);
        bootstrapcss.setAttribute("rel", "stylesheet");
        bootstrapcss.setAttribute("href", "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css");
        bootstrapcss.setAttribute("integrity", "sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T");
        bootstrapcss.setAttribute("crossorigin", "anonymous"); 
        bootstrapcss.setAttribute("type", "text/css");

        var bootstrapquery = document.createElement("script");
        this._shadowRoot.appendChild(bootstrapquery);
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
     * @description Function that allows the use to set the buttons name bassed on the
     * value of the inner html
     * @param {string} buttonId the Id for a specific button
     * 
     */
    setButtonName(buttonId, beerButton){
        var $id = document.getElementById(buttonId);
        if($id.innerHTML.length > 0){
            beerButton.innerHTML= $id.innerHTML;
        }
        else{
            console.log( "no Name provided");
        }
    }

    /**
    * @description Function that allows for a custom style sheet to be applied
    * @param {string} newStyle string that is the .css file to be imported
    * @example
    * 
    * <beer-button newStyle="styles.css">Style Testing</beer-button>
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
window.customElements.define("beer-button", BeerButton);
