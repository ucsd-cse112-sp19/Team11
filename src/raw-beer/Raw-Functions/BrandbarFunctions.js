/**
 * @description Function that helps with selecting attributes
 */
export function AttributeSelector(){
    
    if(this.hasAttribute("id")){
        if(this.hasAttribute("beerId")){
            this.$beerA.setAttribute("id", this.getAttribute("beerId"));
        }
        this.$beerA.setAttribute("id", this.getAttribute("id"));         
    }
        
    if(this.hasAttribute("beerclass")){
        if(this.getAttribute("beerclass").length > 0){
            this.$beerA.setAttribute("class", this.getAttribute("beerclass"));
        }
        else{
            console.log("The class field is set to empty");
        }
    }
    if(this.hasAttribute("beertype")){
        if(this.getAttribute("beertype").length > 0){
            this.$beerA.setAttribute("type", this.getAttribute("beertype"));
        }
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

/**
     * @description Function that allows the use to set the buttons name bassed on the
     * value of the inner html
     * @param {string} buttonId the Id for a specific button
     * @retun void 
     */
