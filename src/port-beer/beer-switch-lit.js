import {LitElement, html, css} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

/**
 * Beer web component that was ported from the Element library
 */
class BeerSwitchLit extends LitElement {
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
            bootstrap_class: {type: String, reflect: true},
            
            color: {type: String, reflect: true},
            //more properties

        };
    }

    constructor() {
        super();
        // Default attributes
        this.size = "";
        this.loading = false;
        this.disabled = false;
        this.round = false;
        this.circle = false;

        this.type = "checkbox"
        this.color = "red";

        // Set the text property with the user text in between tag
        // <beer-button-lit>USER TEXT</beer-button-lit>
        this.text = this.textContent;

        var disabled_attr = this.getAttribute("disabled");

        //disable the slider
        if(disabled_attr == "") {
            this.disabled = true;
        }
        
    }

    /**
     * @description CSS styling that will style the switch component
     */
    static get styles() {
        return css`
      :host {
        display: block;
        font-family: sans-serif;
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

      .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
      }
      
      .switch input { 
        opacity: 0;
        width: 0;
        height: 0;
      }
      
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: blue;
        -webkit-transition: .4s;
        transition: .4s;
      }
      
      .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
      }

      input:checked + .slider {
        background-color: black;
      }
      
      input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
      }
      
      input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
      }
      
      /* Rounded sliders */
      .slider.round {
        border-radius: 34px;
      }
      
      .slider.round:before {
        border-radius: 50%;
      }
    `;
    }

    _getColor(){
        return "black";
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
     *
    _getStyle() {
        let _style = "";
        console.log("Asdfasdfad")
        
        let style_background = ` 
            background-color: white;
            `
        ;

        _style = style_background;
        console.log(_style)

        //var isDefault = this.type === ""; // Check to see if type is default

        /*
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
}*/

    _clickHandler() {
        
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
        
        if (this.onClickFunction == undefined || this.onClickFunction == null) {
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

        return html`    
            <label class="switch">
            <input type="checkbox" checked>
            <span class="slider round"></span>
            </label>

        `;
    
    }
}
customElements.define("beer-switch-lit", BeerSwitchLit);
