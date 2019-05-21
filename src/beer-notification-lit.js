import {LitElement, html, css} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

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
        this.duration = 4500;
        this.position = "";
        this.offset = 0;


    }


    static get styles() {
        return css`
        :host {
            display: block;
            font-family: sans-serif;
            text-align: left;
        }
        .popup {
            /*display: none;*/   /* Hidden by default. Use this when we have linked with button.
                                Once linked with button, notification will show up when button
                                is clicked. */
            position: fixed;     /* Stay in place */
            z-index: 1;          /* Sit on top */
            padding-top: 100px;  /* Location of the box */
            left: 0;
            top: 0;
            width: 100%;         /* Full width */
            height: 100%;        /* Full height */
            overflow: auto;      /* Enable scroll if needed */
            background-color: #EDEDED;      /* Fallback color */
        }

        /* The Close Button */
        .close {
            color: #aaaaaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }

        /* Notification Content */
        .popup-content {
            background-color: #fefefe;
            margin: auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
        }
      
        .close:hover, .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
        `;
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
        <div class="popup">
            <div class="popup-content">
                <span class="close">&times;</span>
                <p>${this.text}</>
            </div>
        </div>
    `;
    }
}

window.customElements.define("beer-notification-lit", BeerNotificationLit);