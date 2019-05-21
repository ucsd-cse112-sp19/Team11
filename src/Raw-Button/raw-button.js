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
        
        



        if(this.hasAttribute("id")){
            if(this.hasAttribute("beerId")){
                this.setButtonName(this.getAttribute("id"));
                this.$beerButton.setAttribute("id", this.getAttribute("beerId"));
            }
            this.setButtonName(this.getAttribute("id"));
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
                this.setStyle(this.getAttribute("newStyle"));
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
            this.setStyle("./ButtonStyles/disable.css");
        }
    } 


    /**
     * @description Function that allows the use to set the buttons name bassed on the
     * value of the inner html
     * @param {string} buttonId the Id for a specific button
     * @retun void 
     */
    setButtonName(buttonId){
        //grabs the correct button that corresponds with the Id
        console.log(buttonId);
        var $id = document.getElementById(buttonId);
        if($id.innerHTML.length > 0){
            this.$beerButton.innerHTML= $id.innerHTML;
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
    setStyle(newStyle){
        var Style = document.createElement("link");
        this._shadowRoot.appendChild(Style);
        Style.setAttribute("rel", "stylesheet");
        Style.setAttribute("href", newStyle);
        Style.setAttribute("type", "text/css");
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
            try{
                import(scriptName).then(script =>{
                    script[functionName]();
                });
            }
            catch(err){
                err.message;
            } 
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
        this._shadowRoot.querySelector("button").style.background = color;
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
            this.setStyle("./ButtonStyles/block.css");
        }
        if(styleName == "border"){
            this.setStyle("./ButtonStyles/border.css");
        }
        if(styleName == "danger"){
            this.setStyle("./ButtonStyles/danger.css");
        }
        if(styleName == "disable"){
            this.setStyle("./ButtonStyles/disable.css");
        }
        if(styleName == "hoverButton"){
            this.setStyle("./ButtonStyles/hoverButton.css");
        }
        if(styleName == "info"){
            this.setStyle("./ButtonStyles/info.css");
        }
        if(styleName == "link"){
            this.setStyle("./ButtonStyles/link.css");
        }
        if(styleName == "medium"){
            this.setStyle("./ButtonStyles/medium.css");
        }
        if(styleName == "primary"){
            this.setStyle("./ButtonStyles/primary.css");
        }
        if(styleName == "round"){
            this.setStyle("./ButtonStyles/round.css");
        }
        if(styleName == "small"){
            this.setStyle("./ButtonStyles/small.css");
        }
        if(styleName == "success"){
            this.setStyle("./ButtonStyles/success.css");
        }
        if(styleName == "warning"){
            this.setStyle("./ButtonStyles/warning.css");
        }
        if(styleName == "xsmall"){
            this.setStyle("./ButtonStyles/xsmall.css");
        }
        if(styleName == "large"){
            this.setStyle("./ButtonStyles/large.css");
        }
    }
}

window.customElements.define("beer-button", BeerButton);