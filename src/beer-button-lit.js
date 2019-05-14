import {LitElement, html, css} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

// Color of button depending on type attribute
const types = [
    {type: "primary", bgColor: "#409EFF"}, 
    {type: "success", bgColor: "#67C23A"}, 
    {type: "info",    bgColor: "#909399"}, 
    {type: "warning", bgColor: "#F4A338"}, 
    {type: "danger",  bgColor: "#F56C6C"}
];

// filter: brightness(85%);

class BeerButtonLit extends LitElement {
    static get properties() {
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
            },
            mainColor: {
                type: String
            }
        };
    }

    constructor() {
        super();
        this.type = ""; // Default
        this.text = "Default";
        this.size = "";
        this.disabled = false;
        this.loading = false;
    }

    static get styles() {
        return css`
      :host {
        display: block;
        font-family: sans-serif;
      }

      /* Default button styling */
      button {
        cursor: pointer;
        border: 1px solid #DCDFE6;
        border-radius: 0.3rem;
        background-color: white;
        padding: 0.8rem 1rem;
        margin: 0.2rem;
        color: #60627D;
      }

      button:hover {
          border: 1px solid #CAE4FF;
          background-color: #ECF5FF;
          color: #409EFF;
          transition: 0.05s;
      }
      
    `;
    }


    render() {
        var isDefault = this.type === "";
        var typesItem = types.find((elem) => {
            return elem.type === this.type;
        });

        if(!isDefault) {
            var style_background = "background-color:" + typesItem.bgColor + ";";
            var style_border     = "border:none;";
            var style_textColor  = "color:white;";
        }

        return html`
        <button style=${!isDefault? style_background + style_border + style_textColor: ""}>
        ${this.text}
        </button>
        `;
    }
}
customElements.define("beer-button-lit", BeerButtonLit);
