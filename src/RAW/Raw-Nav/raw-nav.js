"use strict";
import {AttributeSelector, setStyle} from "../Raw-Functions/AtrributeFunctions.js";

const template = document.createElement("template");
template.innerHTML = `
<style>
    :host{
        display block;
        font-family: sans-serif;
        text-align: center
    }
    
    nav {
        border: 2px solid;
        cursor: pointer;
    }
</style>

<nav>
 <a>hello</a>
 <a>people</a>
 <a>it seems like this all becomes one sentence</a>
</nav>
`;

/**
 * A vanilla web-component
 */
class BeerNav extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({"mode" : "open"});
        
        // this is the piece of code that takes all that html stuff up top and makes 
        // it visible
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$beerNav = this._shadowRoot.querySelector("nav");
        this.$rawNav= document.querySelector("beer-nav");  
        
        // This is the same as before Im making it so that all the variables here 
        // are available to Attribute Selector 
        this.AttributeSelector = AttributeSelector.bind(this);
        this.AttributeSelector();
    }  
      
}
window.customElements.define("beer-nav", BeerNav);