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
<h1> helllo <h1> 
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
        
        this.$beerButton.addEventListener('click', this.linkFunction.bind(this));
    }
     
    /**
     * @description : Takes a link and when the button is clicked will navigate the browser to the new link
     * @param userLink : the link that the user provides
     * @return : void
     */
    linkFunction(){
        this.$findh1.innerHTML = "hello suicide team";
    }
}

window.customElements.define('beer-button', BeerButton)
