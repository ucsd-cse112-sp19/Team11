import {LitElement, html, css} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

// Color of button depending on type attribute
const types = [
    {type: "primary", bgColor: "#409EFF", bgLighter:"#8CC5FF", bgPlain: "#ECF5FF"}, 
    {type: "success", bgColor: "#67C23A", bgLighter:"#A3DA88", bgPlain: "#F0F9EB"}, 
    {type: "info",    bgColor: "#909399", bgLighter:"#BCBEC2", bgPlain: "#F4F4F5"}, 
    {type: "warning", bgColor: "#F4A338", bgLighter:"#F8C887", bgPlain: "#FDF6EC"}, 
    {type: "danger",  bgColor: "#F56C6C", bgLighter:"#F9A6A6", bgPlain: "#FEF0F0"}
];

/**
 * Beer web component that was ported from the Element library
 */
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
            circle:   {type: Boolean, reflect: true},
            bootstrap: {type: Boolean, reflect: true},
            onClickFunction: {type: Function, reflect: false},
            notification: {type: String, reflect: true},
            bootstrap_class: {type: String, reflect: true}

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

        this.bootstrap = false;
        this.bootstrap_class = "";

        // Set the text property with the user text in between tag
        // <beer-button-lit>USER TEXT</beer-button-lit>
        this.text = this.textContent;
        var loading_attr = this.getAttribute("loading");
        var disabled_attr = this.getAttribute("disabled");
        
        // bootstrap
        var bootstrap_attr = this.getAttribute("bootstrap");
        
        this.notification = "";

        // loading attribute is present if var loading_attr is not null
        if(loading_attr == "") {
            this.loading = true;
        }
        if(disabled_attr == "") {
            this.disabled = true;
        }

        if(bootstrap_attr != "" && bootstrap_attr != undefined){
            this.bootstrap = true;
            this.bootstrap_class = bootstrap_attr;
        }
        
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


    /**
     * @description Will get the CSS class(es) this web component will have
     * @returns {string} CSS classes 
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
     * @description CSS style this web component will have
     * @returns {string} CSS styles
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
     * @description Checks of the 'type' attribute is valid. Valid types are: primary, succuess, info, warning, danger, or "" (default)
     * @returns {boolean} valid
     * 
     */
    _validType() {
        let valid = false;
        types.find((elem) => {
            if(elem.type === this.type) valid = true;
        });
        return valid || this.isDefault;
    }

    _clickHandler() {
        console.log(this.notification);
        if (this.notification != undefined && this.notification != null && this.notification != "") {
            // alert("You clicked the button!");
            // set default behavior to create a new notification
            let newNotification = ""
            if(this.type === "danger") {
                newNotification = `<beer-notification-lit type="danger" title="Message" duration="7000">
                                        ${this.notification}
                                   </beer-notification-lit>`;
            }
            else if(this.type === "info") {
                newNotification = `<beer-notification-lit type="info" title="Message" duration="7000">
                                        ${this.notification}
                                   </beer-notification-lit>`;
            }else if(this.type === "success") {
                newNotification = `<beer-notification-lit type="success" title="Message" duration="7000">
                                        ${this.notification}
                                   </beer-notification-lit>`;
            }else if(this.type === "warning") {
                newNotification = `<beer-notification-lit type="warning" title="Message" duration="7000">
                                        ${this.notification}
                                   </beer-notification-lit>`;
            }else {
                newNotification = `<beer-notification-lit type="message" title="Message" duration="7000">
                                        ${this.notification}
                                   </beer-notification-lit>`;
            }
            // Syntax: node.insertAdjacentHTML(position, text)
            // document.querySelector("body").insertAdjacentHTML("afterbegin", newNotification); 
            // ^^^ NOTE: Using "afterbegin" will inject notification elements into the HTML page
            //           in descending order. (new notifications will be above older ones)
            //
            //           For example:
            //           <body>
            //              <notification 3>
            //              <notification 2>
            //              <notification 1>
            //           </body>

            document.querySelector("body").insertAdjacentHTML("beforeend", newNotification); 
            // ^^^ NOTE: Using "beforeend" will inject notification elements into the HTML page
            //           in ascending order (newer notifications will be below older ones)
            //
            //           For example:
            //           <body>
            //              <notification 1>
            //              <notification 2>
            //              <notification 3>
            //           </body>
        }
        else if (this.onClickFunction == undefined || this.onClickFunction == null) {
            alert("No behavior specified");
        }
        else {
            this.onClickFunction(this);
        }
    }

    // TODO missing documentation
    /**     
     * @description
     * @returns {html} 
     */
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

        // boostrap
        if(this.bootstrap){
            // console.log(this.bootstrap_class);
            // console.log(this.bootstrap_attr);
            return html`
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
            
            <button type="button" class=${this.bootstrap_class}>
            ${this.text}
            </button>
            `;
        }

        // default button css
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
