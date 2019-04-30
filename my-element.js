// We need to re-install node in our repo because we don't have all the packages we need: lit-element is missing
// I then import this base class before extending it

import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {

  // Right now I will only introduce themessage property to allow us to change the message input
  // I think it is the only thing we need for the moment but we can add properties later on
  
  static get properties() {
    return {
      message: { type: String },
    };
  }
  
  // A constructor to define the properties based on the Lit-element class
  
  constructor() {
    super();
  }

  render() {
    return html'
      
      <div>
          The message is: ${this.message}
      </div>
      
    ;
  }
  
  
customElements.define('my-element', MyElement);
