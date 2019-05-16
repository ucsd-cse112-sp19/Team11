import {LitElement, html, css} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

// Color of button depending on type attribute
const types = [
    {type: "primary", bgColor: "#409EFF", bgLighter:"#8CC5FF", bgPlain: "#ECF5FF"}, 
    {type: "success", bgColor: "#67C23A", bgLighter:"#A3DA88", bgPlain: "#F0F9EB"}, 
    {type: "info",    bgColor: "#909399", bgLighter:"#BCBEC2", bgPlain: "#F4F4F5"}, 
    {type: "warning", bgColor: "#F4A338", bgLighter:"#F8C887", bgPlain: "#FDF6EC"}, 
    {type: "danger",  bgColor: "#F56C6C", bgLighter:"#F9A6A6", bgPlain: "#FEF0F0"}
];

// Index to keep track of which beer-button-lit component in a given HTML page
// when there are multiple
var idx = 0;

class BeerButtonLit extends LitElement {
    static get properties() {
        return {
            // reflect: true if we are reflecting the property to an attribute
            // Example: We can even specify how we want attributes to be reflected
            // attribute: todo
            // <to-do-item todo="Finish blog"></to-do-item>
            type:     {type: String, reflect: true},
            text:     {type: String, reflect: true},
            size:     {type: String, reflect: true},
            disabled: {type: Boolean, reflect: true},
            loading:  {type: Boolean, reflect: true},
            round:    {type: Boolean, reflect: true},
            circle:   {type: Boolean, reflect: true}
        };
    }

    constructor() {
        super();
        // Default attributes
        this.type = "";
        this.size = "";
        this.loading = false;
        this.disabled = false;
        this.round = false;
        this.circle = false;

        // Checks if loading attribute exists
        var beer_button_lit = document.getElementsByTagName("beer-button-lit").item(idx);

        // Increment the index for each new beer-button component
        idx++;

        // Set the text property with the user text in between tag
        // <beer-button-lit>USER TEXT</beer-button-lit>
        this.text = beer_button_lit.textContent;
        var loading_attr = beer_button_lit.getAttribute("loading");
        var disabled_attr = beer_button_lit.getAttribute("disabled");

        // loading attribute is present if var loading_attr is not null
        if(loading_attr == "") {
            this.loading = true;
        }
        if(disabled_attr == "") {
            this.disabled = true;
        }

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
        filter: brightness(108%);
        transition: 0.05s;
      }

      button:focus {
        outline:none;
        filter: brightness(108%);
      }

      .round {
        border-radius: 35px;
      }
      
      .circle {
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
      }

      .medium {
        transform: scale(0.90);
      }

      .small {
        transform: scale(0.80);
      }

      .mini {
        transform: scale(0.70);
      }      
      
      .unclickable {
        pointer-events:none;
        opacity: 0.6;
        transition: 0.05s;
      }
    `;
    }

    /**
     * Returns string representing CSS classes this web
     * component will have
     */
    _getClass() {
        let _class = "";
        if(this.round) {
            _class += "round ";
        }
        if(this.circle) {
            _class += "circle ";
        }
        if(this.loading | this.disabled) {
            _class += "unclickable ";
        }
        if(!this.isDefault) {
            _class += "nonDefault ";
            if (this.size == "medium") _class += "medium ";
            else if (this.size == "small") _class += "small ";
            else if (this.size == "mini") _class += "mini ";
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
            let style_background = "background-color:";
            let style_border     = "border:";
            let style_textColor  = "color:";

            let typesItem = types.find((elem) => {
                let match = elem.type === this.type;
                return match;
            });

            // Generate appropriate style string
            style_background += typesItem.bgColor + ";";
            style_border     += "none;";
            style_textColor  += "white;";


            _style = style_background + style_border + style_textColor;
        }
        if(this.loading) {
            _style += "cursor: default;";
        }
        return _style;
    }

    /**
     * Checks of the 'type' attribute is valid.
     * Valid types are: primary, succuess, info, warning, danger, or "" (default)
     */
    _validType() {
        let valid = false;
        types.find((elem) => {
            if(elem.type === this.type) valid = true;
        });
        return valid | this.isDefault;
    }

    _clickHandler() {
        alert("You clicked the button!");
    }


    render() {
        if(!this._validType()) {
            this.type = "";
        }

        // If the loading attribute is set to true, render custom html
        if(this.loading) {
            if(!this.circle) {
                this.text = "Loading";
            }
            return html`
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <button class=${this._getClass()} style=${this._getStyle()}>
            <i class="fa fa-spinner fa-spin"></i>
            ${this.text}
            </button>
            `;
        }

        return html`
        <div style=${this.disabled ? "cursor: not-allowed" : "" }>
            <button class=${this._getClass()} style=${this._getStyle()} @click=${this._clickHandler}>
            ${this.text}
            </button>
        </div>
        `;
    }
}
customElements.define("beer-button-lit", BeerButtonLit);
