import { LitElement, html, css } from 'https://unpkg.com/lit-element@2.0.1/lit-element.js?module'

class BeerButtonLit extends LitElement {

  static get properties () {
    return {
      type: {
        type: String,
        reflect: true
      },
      text: {
        type: String,
        reflect: true // true if we are reflecting the property to an attribute
        // Example: We can even specify how we want attributes to be reflected
        // attribute: todo
        // <to-do-item todo="Finish blog"></to-do-item>
      },
      size: {
        type: String, // Accepted values: medium, small, mini
        reflect: true
      },
      disabled: {
        type: Boolean,
        reflect: true
      },
      loading: {
        type: Boolean,
        reflect: true
      }
    }
  }

  static get styles () {
    return css`
      :host {
        display: block;
        font-family: sans-serif;
      }
      button {
        cursor: pointer;
        border: none;
        background-color: salmon;
      }
    `;
  }

  constructor () {
    super()
    this.type = '' // Default
    this.text = 'Click Me'
    this.size = ''
    this.disabled = false

    //checks if loading attribute exists
    var beer_button_lit = document.getElementsByTagName('beer-button-lit').item(0);
    var loading_attr = beer_button_lit.getAttribute("loading");

    //loading attribute is present if var loading_attr is not null
    if(loading_attr == ""){
      this.loading = true;
      this.disabled = true;
      this.text = "Loading";
    }

    this.loading = false;
  }

  render () {

    //if the loading attribute is set to true, render custom html
    if(this.loading){
      return html
      `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <button class="buttonload">
      <i class="fa fa-spinner fa-spin"></i>Loading
      </button>
      `
    }
    return html
    `
      <button>${this.text}</button>
    `
  }
}
customElements.define('beer-button-lit', BeerButtonLit)
