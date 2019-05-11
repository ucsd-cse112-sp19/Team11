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
    }
}

window.customElements.define('beer-button', BeerButton)
