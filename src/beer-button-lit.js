//test comment commit
import {LitElement, html, css} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

// Color of button depending on type attribute
const types = [
    {type: "primary", bgColor: "#409EFF"}, 
    {type: "success", bgColor: "#67C23A"}, 
    {type: "info",    bgColor: "#909399"}, 
    {type: "warning", bgColor: "#F4A338"}, 
    {type: "danger",  bgColor: "#F56C6C"}
];

const sizes = [
    {size: "medium", height: "200px", width: "200px"},
    {size: "", height: "100px", width: "100px"},
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
            },
            round: {
                type: Boolean,
                reflect: true
            },
            circle: {
                type: Boolean,
                reflect: true
            }
        };
    }

    constructor() {
        super();
        this.type = ""; // Default
        this.text = "Default";
        this.size = "";
        this.disabled = false;
        this.round = false;
        this.circle = false;

        // Checks if loading attribute exists
        var beer_button_lit = document.getElementsByTagName("beer-button-lit").item(0);
        var loading_attr = beer_button_lit.getAttribute("loading");

        // loading attribute is present if var loading_attr is not null
        if(loading_attr == ""){
            this.loading = true;
            this.disabled = true;
            // this.text = "Loading"; // this is setting the text of every button to Loading
        }

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
      
      button.nonDefault:hover {
        opacity: 0.8;
        transition: 0.05s;
      }

      button:focus {
        outline:none;
      }

      .round {
        border-radius: 35px;
      }
      
      .circle {
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
      }
      
    `;
    }

    /**
     * Returns string representing CSS classes this web
     * component will have
     */
    _getClass() {
        let _class = "";
        if (this.round) {
            _class += "round ";
        }
        if (this.circle) {
            _class += "circle ";
        }
        if (this.loading) {
            _class += "buttonload ";
        }
        if (!this.isDefault) {
            _class += "nonDefault";
        }
        return _class;
    }

    /**
     * Returns string representing CSS style this web
     * component will have
     */
    _getStyle() {
        let _style = "";
        var isDefault = this.type === ""; // Check to see if type is default

        // Find the corresponding type to select appropriate button color
        if(!isDefault) {
            let typesItem = types.find((elem) => {
                let match = elem.type === this.type;
                this.text = this.type;
                return match;
            });

            let sizesItem = sizes.find((elem) => {
                let match = elem.size === this.size;
                return match;
            });
            
            // Generate appropriate style string
            let style_background = "background-color:" + typesItem.bgColor + ";";
            let style_border     = "border:none;";
            let style_textColor  = "color:white;";
          
            let style_height = "height:" +sizesItem.height+";";
            let style_width = "width:"+sizesItem.width+";";

            _style = style_background + style_border + style_textColor +style_height+style_width;

            return _style;
        }
    }


    render() {

        // If the loading attribute is set to true, render custom html
        if(this.loading){
            return html`
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <button class=${this._getClass()} style=${this._getStyle()}>
            <i class="fa fa-spinner fa-spin"></i>Loading
            </button>
            `;
        }

        return html`
        <button class=${this._getClass()} style=${this._getStyle()}>
        ${this.text}
        </button>
        `;
    }
}
customElements.define("beer-button-lit", BeerButtonLit);
