const template = document.createElement( "template" );
template.innerHTML = `
<style>
    :host{
        display block;
        font-family: sans-serif;
        text-align: center
    }
    
    button {
        border: 2px solid;
        cursor: pointer;
    }
</style>
<button> Im a Button </button>
`;


class BeerButton extends HTMLElement{
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({"mode" : "open"});
        // this is the piece of code that takes all that html stuff up top and makes it visible
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$beerButton = this._shadowRoot.querySelector("button");
        
        
        
        // else if(attribute == maybe just maybe we can take in a function from the user hmmmmmmm, Ill think more on this){
        //  execute code
        // }
         
        if(!this.hasAttribute("disable")){
            if(this.hasAttribute("link")){
                this.$beerButton.addEventListener("click", this.linkFunction.bind(this));
            }
            else if(this.hasAttribute("increment")){
                this.inc = true;
              
                this.$beerButton.addEventListener("click", this.incrementDecrementFunction.bind(this));
            }
            else if(this.hasAttribute("decrement")){
                this.inc = false;

                this.$beerButton.addEventListener("click", this.incrementDecrementFunction.bind(this));
            }

        }
    }     
    /**
     * @description : Takes a link and when the button is clicked will navigate the browser to the new link
     * @return : void
     */
    linkFunction(){
        // grabs the value of link 
        var linkValue = this.getAttribute("link");
        if( linkValue.length <= 0 ){
            console.log( "Invalid Link" );
        }
        else{
        // navigates the browser to a new webpage
            window.location.href = linkValue;
        }
    }

    /**
     * @description: Function that allows the user to increment a selected field 
     * @param value: boolean when true increments when false decrements
     * @returns: void 
     */
    incrementDecrementFunction(){
        var value;
        if(this.inc){
            var incrementId = this.getAttribute("increment");
            // check to see if the value not null
            if( incrementId <= 0 ){
                console.log( "Invalid input");
            }
            else{
            // take the field and parse it into an integer and then perform the increment operation
            // on that returned value and then set this as the new value 
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
                console.log( "Invalid input");
            }
            // take the field and parse it into an integer and then perform the decrement operation
            // on that returned value and then set this as the new value 
            value = parseInt(document.getElementById(decrementId).value, 10);
            value --;
            document.getElementById(decrementId).value = value;
        }

    }
}

window.customElements.define("beer-button", BeerButton);
