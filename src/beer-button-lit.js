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
        reflect: true 
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

  constructor () {
    super()
    this.type = '' // Default
    this.text = 'Click Me'
    this.size = ''
    this.disabled = false

    var beer_button_lit = document.getElementsByTagName('beer-button-lit').item(0);
    var disabled_attr = beer_button_lit.getAttribute("disabled");

    if(disabled_attr == ""){
      this.disabled = true;
    }
  }

  render () {

    //if the loading attribute is set to true, render custom html
    if(this.disabled){
      return html `
      <button type="button" disabled>${this.text}</button>
      `
    }
    return html`
      <button type="button">${this.text}</button>
    `
  }
}
customElements.define('beer-button-lit', BeerButtonLit)
