"use strict";



const template = document.createElement("template");
template.innerHTML = `
<a>
<img>
</a>

`;

/**
 * @description Web Component that functions as a brand allowing the user to change the size 
 * and image through various attributes as well as the displayed text and use a link atribute so
 * that another webpage can be loaded when the beer-brand is clicked. 
 * Attributes:beerClass,brandHref, navBarBrandId, ID, brandImage, brandHeight, 
 * brandWidth imageClass, imageAlt, newStyle,
 * @extends HTMLElement
 * @example
 * <beer-brand><beer-brand>
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


        
        this.AttributeSelector();

    }


    /**
     * @description Function that sets the src attribute on the img element attribute in the defined 
     * template 
     * @example
     * <img src="./hello.jpg"></img>
     */
    setBrandImage(){
        // You get the attribute brandImage as a string here; it's basically the path
        var image = this.getAttribute("brandImage");
        // same as the above but it grabs the image alt attribute
        var altImg = this.getAttribute("imageAlt");
        // this if statement is checking if the first path is valid if it is then the file gets loaded
        // if it is not then the  altImg is used and if that one is invalid as well then it console.log
        // an error msg
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
     * @description Function is used to check if a file exists on the system 
     * @deprecated
     * @param {string} urlToFile pass the url of the file to the function so that it can check 
     * if the file is a valid file on the system
     * @return {boolean} True if the file file is found, false if the file is not found
     */
    doesFileExist(urlToFile) {
        var xhr = new XMLHttpRequest();
        
        xhr.open("HEAD", urlToFile, false);
        xhr.send();
         
        return xhr.status != "404"            
    }

    /**
     * @description Function that is used to append a string to the a element 
     * in the above template
     * 
     * @example  <a> helllo <a>
     */
    setBrandName(){
        // grabs the correct brand that corresponds with the Id
        if(this.innerHTML.length > 0){
            this.$beerA.append(this.innerHTML);
        }
        else{
            this.$beerA.append("Beer-Brand");
            console.log("no Name provided");
        }
    }


    /**
    * @description Function that helps with reading the attributes from the WebComponent 
    */
    AttributeSelector(){
        
        if(this.hasAttribute("id")){
            if(this.getAttribute("id").length > 0){
                var setBrandName = this.setBrandName.bind(this);
                this.setBrandName();
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
            // sets the default height and width for a brand image if the user has 
            // not applied one
            this.$beerImg.setAttribute("height", "30");
            this.$beerImg.setAttribute("width", "30");
            if(this.getAttribute("brandImage").length > 0){
                this.setBrandImage();
            }
        }

        // if statment that checks if the user has applied the brandHeight attribute
        // this will allow the user to adjust the height of their supplied image
        if(this.hasAttribute("brandHeight")){
            if(this.getAttribute("brandHeight").length > 0){
                this.$beerImg.setAttribute("height", this.getAttribute("brandHeight"));
            }
        }

        // if statement that checks if the user has applied the brandWidth Attribute
        // this will allow the user to adjust the width of their supplied image
        if(this.hasAttribute("brandWidth")){
            if(this.getAttribute("brandWidth").length > 0){
                this.$beerImg.setAttribute("width", this.getAttribute("brandWidth"));
            }
        }

        // if statement that checks if the user has applied the imageClass attribute
        // this will allow the user to add an class to the img tag
        if(this.hasAttribute("imageClass")){
            if(this.getAttribute("imageClass").length > 0){
                this.$beerImg.setAttribute("class", this.getAttribute("imageClass"));
            }
        }

        // if statement that checks if the imageAlt attribute has been applied 
        // this will allow the user to load an alternate image if the first one 
        // supplied fails
        if(this.hasAttribute("imageAlt")){
            if(this.getAttribute("imageAlt").length > 0){
                this.$beerImg.setAttribute("alt", this.getAttribute("imageAlt"));
            }
        }
    
        // checks to see if the user has supplied an id and then applies it to the
        // anchor element in the above template
        if(this.hasAttribute("id")){
            if(this.hasAttribute("beerId")){
                this.$beerA.setAttribute("id", this.getAttribute("beerId"));
            }
            this.$beerA.setAttribute("id", this.getAttribute("id"));         
        }
        else{
            this.$beerA.append("Beer-Brand");
        }
        
        // checks for a beerclass attribute which is used to help further seperate the Doms
        // this bassically applies a class to the anchor
        if(this.hasAttribute("beerclass")){
            if(this.getAttribute("beerclass").length > 0){
                this.$beerA.setAttribute("class", this.getAttribute("beerclass"));
            }
            else{
                console.log("The class field is set to empty");
            }
        }

        // allows the user to add a type attribute to the anchor
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
                this.setStyle(this.getAttribute("newStyle"), this._shadowRoot);
            }

            else if(this.hasAttribute("libStyle")){
                this.libStyle(this.getAttribute("libStyle"));
            }
        }

        if(this.hasAttribute("bootstrap")){
            this.setBootStrap();   
        }
    }

    /**
     * @description Function that allows the user to applie the bootstrap styles to the component
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
window.customElements.define("beer-brand", BeerBrand);