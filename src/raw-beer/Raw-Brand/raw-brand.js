"use strict";




import {AttributeSelector} from "../Raw-Functions/BrandbarFunctions.js";


const template = document.createElement("template");
template.innerHTML = `
<a  href="#">
<img src="../raw-brand/beerlogo.jpg" width="30" height="30" class="d-inline-block align-top" alt="">
Bootstrap
</a>

`;

/**
 * A vanilla web-component
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

        this.AttributeSelector = AttributeSelector.bind(this);
        this.AttributeSelector();
    }
}
window.customElements.define("beer-brand", BeerBrand);