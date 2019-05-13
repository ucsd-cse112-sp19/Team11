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
  constructor () {
    super()
    this.type = '' // Default
    this.text = 'Click Me'
    this.size = ''
    this.disabled = false
    this.loading = false
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
    `
  }

  render () {
    return html`
      <button>${this.text}</button>
    `
  }
}
customElements.define('beer-button-lit', BeerButtonLit)