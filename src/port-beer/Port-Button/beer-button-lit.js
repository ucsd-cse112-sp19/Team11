import {LitElement, html, css} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";
import "./../Port-Notification/beer-notification-lit.js";

// Color of button depending on type attribute
const types = [
    {type: "primary_not_really", bgColor: "#409EFF", bgLighter:"#8CC5FF", bgPlain: "#ECF5FF"}, 
    {type: "success", bgColor: "#67C23A", bgLighter:"#A3DA88", bgPlain: "#F0F9EB"}, 
    {type: "info",    bgColor: "#909399", bgLighter:"#BCBEC2", bgPlain: "#F4F4F5"}, 
    {type: "warning", bgColor: "#F4A338", bgLighter:"#F8C887", bgPlain: "#FDF6EC"}, 
    {type: "danger",  bgColor: "#F56C6C", bgLighter:"#F9A6A6", bgPlain: "#FEF0F0"},
    {type: "foo", bgColor: "#fff"}
];

/**
 * Beer button web component that was ported from the Element library
 */
class BeerButtonLit extends LitElement {
    static get properties() {
        return {
            // reflect: true if we are reflecting the property to an attribute
            
            // primary, success, info, warning, danger
            type:            {type: String,  reflect: true},
            text:            {type: String},
            // size of button
            size:            {type: String,  reflect: true},
            // If true, then button is disabled.
            disabled:        {type: Boolean, reflect: true},
            
            // If true, then there is a loading animation in the button.
            loading:         {type: Boolean, reflect: true},
            
            // Bollean property to make button rounded.
            round:           {type: Boolean, reflect: true},
            
            // If true, then the button become circle.
            circle:          {type: Boolean, reflect: true},
            
            // If true, then bootstrap is applied.
            bootstrap:       {type: Boolean, reflect: true},
            
            // bootstrap, circle, round, loading
            class:           {type: String, reflect: true},
            style:           {type: String, reflect: true},
            script:          {type: String, reflect: true},
            functionName:    {type: String, reflect: true}
        };
    }

    constructor() {
        super();
        // Default attributes
        this.type = "";
        this.size = "";
        this.loading = this.hasAttribute("loading");
        this.disabled = this.hasAttribute("disabled");
        this.round = false;
        this.circle = false;

        this.bootstrap = this.hasAttribute("beerClass");
        this.class = "";
        this.style = "";

        // Set the text property with the user text in between tag
        // <beer-button-lit>USER TEXT</beer-button-lit>
        this.text = this.textContent;
        
        // bootstrap
        if(this.bootstrap) {
            this.class = this.getAttribute("beerClass");
        }
        // inline styling
        if(this.hasAttribute("beerStyle")) {
            this.style = this.getAttribute("beerStyle");
        }
    }

    /**
     * @description Perform one-time work after the element’s template has been created.
     */
    firstUpdated() {
        this.$button = this.shadowRoot.querySelector("button");
        // Add a loading icon if loading attribute is specified
        if(this.loading) {
            let loading_icon = document.createElement("i");
            loading_icon.setAttribute("class", "fa fa-spinner fa-spin");
            this.$button.prepend(loading_icon);
        }
    }

    /**
     * @description Will get the CSS class(es) this web component will have
     * @returns {string} CSS classes 
     */
    _getClass() {
        let _class = "";
        if(this.bootstrap) {
            _class += this.class + " ";
        } else {
            if(this.round) {
                _class += "round ";
            }
            if(this.circle) {
                _class += "circle ";
            }
            if(this.loading || this.disabled) {
                _class += "unclickable ";
            }
            if(!this.isDefault) {
                _class += "nonDefault ";
                if (this.size == "medium") _class += "medium ";
                else if (this.size == "small") _class += "small ";
                else if (this.size == "mini") _class += "mini ";
            }
        }
        return _class;
    }

    /**
     * @description It sets the style of the button.
     */
    _setStyle(newStyle) {
        var Style = document.createElement("link");
        this.shadowRoot.appendChild(Style);
        Style.setAttribute("rel", "stylesheet");
        Style.setAttribute("href", newStyle);
        Style.setAttribute("type", "text/css");
    }

    /**
     * @description CSS style this web component will have
     * @returns {string} CSS styles
     */
    _getStyle() {
        let _style = "";
        var isDefault = this.type === ""; // Check to see if type is default

        // If user is usingn bootstrap styling, then ignore beer-button styling
        if(this.bootsrap) {
            return "";
        }

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
        // User specified styling. Will override our preset button styling.
        if(this.style != "") {
            _style += this.style;
        }
        return _style;
    }

    /**
     * @description Checks of the 'type' attribute is valid. Valid types are: primary, succuess, info, warning, danger, or "" (default)
     * @returns {boolean} valid
     */
    _validType() {
        let valid = false;
        types.find((elem) => {
            if(elem.type === this.type) valid = true;
        });
        return valid || this.isDefault;
    }

    /**
     * @description Handle a click event using imported user defined functions
     * @returns void
     * @example 
     * 
     * <beer-button-lit script="./testFunction.js" functionName="testFunction"></beer-button-lit>
     */
    _handleClick() {
        if(this.hasAttribute("script") && this.hasAttribute("functionName")) {
            if(!this.loading && !this.disabled) {
                var scriptName = this.script;
                var functionName = this.functionName;
                if(scriptName.length > 0) {
                    import(scriptName).then(script => {
                        script[functionName]();
                    }).catch(err => {
                        return err.message;
                    });
                }
            }
        }
    }

    /**
     * @description renders the DOM structure described in the element template into the shadow root
     * For example, <beer-button-lit></beer-button-lit> is the custom element (host)
     * The template rendered will be attached to the shadow root of the shadow DOM.
     */
    render() {
        if(!this._validType()) {
            this.type = "";
        }

        if(this.loading) {
            if(!this.circle) {
                this.text = "Loading";
            }
        }

        // default
        return html`
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <div style=${this.disabled ? "cursor: not-allowed" : "" }>
            <button class=${this._getClass()} style=${this._getStyle()} @click=${this._handleClick}>
            ${this.text}
            </button>
        </div>
        `;
    }

    /**
     * @description CSS styling that will style the button component
     */
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
}
customElements.define("beer-button-lit", BeerButtonLit);