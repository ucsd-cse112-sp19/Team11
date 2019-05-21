import {LitElement, html, css} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

var types = [
    {type: "success", svg: "./svg/notif-icon-success.svg"},
    {type: "warning", svg: "./svg/notif-icon-warning.svg"},
    {type: "danger",  svg: "./svg/notif-icon-danger.svg"},
    {type: "info",    svg: "./svg/notif-icon-info.svg"},
];
var idx = 0;

class BeerNotificationLit extends LitElement {
    static get properties() {
        return {
            // success, warning, info, error 
            // (other values will be ignored)
            type:     {type: String, reflect: true},
            title:    {type: String, reflect: true},
            message:  {type: String, reflect: true},

            // If duration="0", then notification will not close automatically
            // Else notification will automatically close after <duration> amount of milliseconds
            // (default: 4500 ms)
            duration: {type: Number, reflect: true},

            // (default: top-right), top-left, bottom-right, bottom-left
            position: {type: String, reflect: true},

            // Notification's offset from the edge of the screen
            // Note that every Notification instance of the same moment should have the same offset
            offset: {type: Number, reflect: true}


            // TODO: Add properties as needed
        };
    }

    /**
     * @description Callback that is called when element is inserted into DOM
     */
    connectedCallback() {
        super.connectedCallback();
        // check if duration is not 0. If it is not set timer for callback function to 
        // remove from dom
        if(this.duration != 0) {
            window.setTimeout(() => {
                // this is passed in because it is a reference to the element that must be removed
                this._removeFromDom(this);
            }, this.duration);
        }
    } 

    constructor() {
        super();
        // Default attributes
        this.type = "";
        this.title = "";
        this.message = "";
        this.duration = 4500; // Default will close after 4500 ms
        this.position = "";
        this.offset = 0;

        var beer_notif_lit = document.getElementsByTagName("beer-notification-lit").item(idx);
        // Increment the index for each new beer-button component
        idx++;

        // Set the message property with the user text in between tag
        // <beer-notification-lit>USER MESSAGE</beer-notification-lit>
        this.message = beer_notif_lit.textContent;
    }


    static get styles() {
        return css`
        :host {
            display: block;
            font-family: sans-serif;
            text-align: left;
        }

        /* Notification box */
        .popup {
            /*display: none;*/   /* Hidden by default. Use this when we have linked with button.
                                Once linked with button, notification will show up when button
                                is clicked. */
            position: fixed;     /* Stay in place on screen */

            z-index: 1;          /* In front of everything else with smaller z-indices 
                                 /* (default z-index is 0 if unspecified) */

            right: 0;            /* By default, positioned on top-right of screen */
            top: 0;
            width: 20em;         /* Fixed width */
            height: auto;        /* Dynamically adjust height based on content */
            overflow: auto;      /* Enable scroll if needed */
            margin: 2em;
            border-radius: 0.5em;
            background-color: white;
        }

        /* Shadow around notification box */
        .shadow {
            /* horizontal-length, vertical-length, blur-radius, shadow-color */
            -webkit-box-shadow:  0em 0em 0.8em #E3E3E3;
            -moz-box-shadow:     0em 0em 0.8em #E3E3E3;
            box-shadow:          0em 0em 0.8em #E3E3E3;
        }

        /* Notification Content */
        .popup-title {
            font-weight: bold;
        }
        .popup-content {
            margin: auto;
            width: 90%;
        }

        /* The Close Button */
        .close {
            color: #a8a8a8;
            float: right;
            font-size: 28px;
        }
      
        .close:hover, .close:focus {
            color: #636363;
            text-decoration: none;
            cursor: pointer;
        }

        .icon {
            width: 1.3em;
            height: 1.3em;
            float: left;
            padding: 0 0.7em 0 0;
        }
        `;
    }

    /**
     * @description Gets the appropriate path to .svg icon file
     * @returns {string} path to corresponding type icon .svg file
     */
    _getTypeIcon() {
        let typeItem = types.find((elem) => {
            let match = elem.type === this.type;
            return match;
        });

        // Check if matching type was found
        if(typeof typeItem !== "undefined") {
            return typeItem.svg;
        }
        return ""; // Otherwise empty path
    }

    /**
     * @description Checks of the 'type' attribute is valid.
     * Valid types are: success, warning, danger, info
     * @returns {boolean} valid
     */
    _validType() {
        let valid = false;
        types.find((elem) => {
            if(elem.type === this.type) valid = true;
        });
        // Only return true if type attribute is one of [success, warning, danger, info]
        // Do not consider default type as a valid type as it is a special case
        return valid;
    }

    /**
     * @description Removes this LitElement from the DOM Tree
     * @param {LitElement} _this Reference to this LitElement
     */
    _removeFromDom(_this) {
        // _this is used instead of this because this will reference the window
        _this.parentNode.removeChild(_this);
    }

    render() {
        return html`
        <div class="popup shadow">
            <div class="popup-content">
                <span>
                    <img class=${this._validType() ? "icon" : ""} 
                           src=${this._getTypeIcon()}>
                    </img>
                </span>
                <p class="popup-title">${this.title}</> 
                <span class="close">&times;</span>
                <p>${this.message}</>
            </div>
        </div>
    `;
    }
}

window.customElements.define("beer-notification-lit", BeerNotificationLit);