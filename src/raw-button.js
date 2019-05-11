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
        this._shadowRoot = this.attachShadow({'mode' : 'open'});
        //this is the piece of code that takes all that html stuff up top and makes it visible
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$findh1 = this._shadowRoot.querySelector('h1');
        this.$beerButton = this._shadowRoot.querySelector('button');
        
        
        //Observation I think were going to need some kinda if statment here where we check an attribute to see which
        //kinda button our user wants to use some pseudo code
        /**
         * if (attribute == link){
         *  execute link code;
         * }
         * else if (attribute == increment/decrement){
         *  execute code to increment or decrement
         * }
         * else if(attribute == maybe just maybe we can take in a function from the user hmmmmmmm, Ill think more on this){
         *  execute code
         * }
         * 
         */
        if(!this.hasAttribute('disable')){
            if(this.hasAttribute('link')){
                this.$beerButton.addEventListener('click', this.linkFunction.bind(this));
            }
        }
    }     
    /**
     * @description : Takes a link and when the button is clicked will navigate the browser to the new link
     * @return : void
     */
    linkFunction(){
        //grabs the value of link 
        var linkValue = this.getAttribute('link');
        //navigates the browser to a new webpage
        window.location.href = linkValue;
    }
}

window.customElements.define('beer-button', BeerButton)
