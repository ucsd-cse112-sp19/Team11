
/**
 * @description Function that helps with selecting attributes
 */
export function AttributeSelector(){
    if(this.hasAttribute("id")){
        if(this.hasAttribute("beerId")){
            setButtonName(this.getAttribute("id"), this.$beerButton);
            this.$beerButton.setAttribute("id", this.getAttribute("beerId"));
        }
        setButtonName(this.getAttribute("id"), this.$beerButton);
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
            setStyle(this.getAttribute("newStyle"), this._shadowRoot);
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
        setStyle("./ButtonStyles/disable.css", this._shadowRoot);
    }
} 


/**
     * @description Function that allows the use to set the buttons name bassed on the
     * value of the inner html
     * @param {string} buttonId the Id for a specific button
     * @retun void 
     */
function setButtonName(buttonId, beerButton){
    // grabs the correct button that corresponds with the Id
    // console.log(buttonId);
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
export function setStyle(newStyle, shadowRoot){
    var Style = document.createElement("link");
    shadowRoot.appendChild(Style);
    Style.setAttribute("rel", "stylesheet");
    Style.setAttribute("href", newStyle);
    Style.setAttribute("type", "text/css");
}






