import {LitElement, html, css} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

var types = [
    {type: "success", svg: "./icons/notif-icon-success.svg"},
    {type: "warning", svg: "./icons/notif-icon-warning.svg"},
    {type: "danger",  svg: "./icons/notif-icon-danger.svg"},
    {type: "info",    svg: "./icons/notif-icon-info.svg"},
    {type: "message", svg: "./icons/notif-icon-message.svg"},
    {type: "bell",    svg: "./icons/notif-icon-bell.svg"},
];
const spacing = 10; // Vertical distance between two notifications
const delay = 200; // 0.2 seconds

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

            // If true, hides the close button from the user so that 
            // notification cannot be closed by the user
            hideClose: {type: Boolean, reflect: true},

            // (default: top-right), top-left, bottom-right, bottom-left
            position: {type: String, reflect: true},

            // Notification's offset from the edge of the screen
            // Note that every Notification instance of the same moment should have the same offset
            offset: {type: Number, reflect: true},

            // Boolean property to keep track of whether the notification is closed or not
            closed: {type: Boolean},

            // The cumulative offset positioning to determine the position of notification dynamically
            prevHeights:  {type: Number}


            // TODO: Add properties as needed
        };
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
        this.hideClose = false;

        // Default properties (unrelated to attributes)
        
        // By default the notification is not closed.
        // This will become true when user clicks on X, or duration time is up
        this.closed = false;
        this.prevHeights = 0; 

        // Set the message property with the user text in between tag
        // <beer-notification-lit>USER MESSAGE</beer-notification-lit>
        this.message = this.textContent;
        var hideClose_attr = this.getAttribute("hideClose");
        if(hideClose_attr == "") {
            this.hideClose = true;
        }

    }

    /**
     * @description Perform one-time work after the element’s template has been created.
     */
    firstUpdated() {
        let all_notifs = document.getElementsByTagName("beer-notification-lit");
        let curr; // To hold the current beer-notification-lit component with index i

        // Calculate the appropriate offset from the top of the screen.
        // This for-loop cumulatively adds the heights of each notification box that comes
        // before "this" notification
        for( var i = 0; (curr = all_notifs.item(i)) !== this; i++ ) {
            // Get the <div> from this component's shadow DOM that has class=".popup"
            // referring to the template in render()
            let currDiv = curr.shadowRoot.querySelector(".popup");

            // Since in the CSS, we made the "height" style property as "height: auto",
            // the height of the notification box changes dynamically to fit the user text.
            // Thus, getComputedStyle() gets the actual height of the box as a string (Example: "123.4px")
            let notif_height = window.getComputedStyle(currDiv, null).getPropertyValue("height");

            // Using regex, remove "px" from the string (Example: "123.4px" --> "123.4")
            let notif_height_value = parseFloat(notif_height.replace(/px/gi, ""));

            // Add to this element's prevHeights property. Also add 10px for margin spacing between notifications
            this.prevHeights += (notif_height_value + spacing);
        }
    }

    /**
     * @description Callback that is called when element is inserted into DOM
     */
    connectedCallback() {
        super.connectedCallback();
        // check if duration is not 0. If it is not set timer for callback function to 
        // close this notification
        if(this.duration != 0) {
            window.setTimeout(() => { // Delay so can see closing notification fade out
                this.closed = true;
                window.setTimeout(() => {
                    this._recalculateOffset();
                    this._removeFromDom(this);
                }, delay);
            }, this.duration);
        }
    } 

    /**
     * @description Gets the appropriate path to .svg icon file
     * @returns {String} path to corresponding type icon .svg file
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
     * @description Checks if the 'type' attribute is valid.
     * Valid types are: success, warning, danger, info, message
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

    /**
     * @description Handles a click event on the top-right 'x'. CLoses the notification.
     * @param {*} event 
     */
    _handleClose(event) {
        // console.log(event.target); // Prints the element that this event is attached to
        // In this case, will print out <span>&times;</span> because when we click on
        // the 'x', the notification box will close (this event fires)

        // Changing the 'closed' property will trigger a call to render(), 
        // which will set "display: none" in _getStyle()
        this.closed = true;

        // Set a delay so can see closing notifications fade out
        window.setTimeout(() => {
            this._recalculateOffset();
            this._removeFromDom(this); // Remove this notification completely from the DOM tree
        }, delay);
    }

    /**
     * @description Recalulate offset from top. 
     * When closing a notification, the ones below it will shift up.
     */
    _recalculateOffset() {
        let all_notifs = document.getElementsByTagName("beer-notification-lit");
        let curr; // To hold the current beer-notification-lit component with index i

        // Start from bottom to up
        for( var i = all_notifs.length - 1; (curr = all_notifs.item(i)) !== this; i-- ) {
            // Get the <div class=".popup"></div> for the this component, which will be removed
            let removedDiv = this.shadowRoot.querySelector(".popup");
            // Get the height style string (Example: "123.4px")
            let notif_height_removed = window.getComputedStyle(removedDiv, null).getPropertyValue("height");
            // Convert from string to number (Example: "123.4px" --> 123.4)
            let notif_height_value_removed = parseFloat(notif_height_removed.replace(/px/gi, ""));

            // Update current component's offset
            curr.prevHeights -= (notif_height_value_removed + spacing);
        }
    }

    /**
     * @description Determine the dynamic CSS styling of the top-level notification box <div>
     * @returns {String} CSS style string
     */
    _getStyle() {
        var notif_box_style = ""; // Default nothing
        if(this._isTop()) {
            notif_box_style += "top: " + this.prevHeights + "px;";
        } else {
            notif_box_style += "bottom: " + this.prevHeights + "px;";
        }

        return notif_box_style;
    }

    /**
     * @description Determine if notification spawns at top or bottom of screen
     * @returns {boolean} top
     */
    _isTop() {
        if(this.position === "" || this.position === "top-right" // Default
                                || this.position === "top-left") {
            return true;
        } else if(this.position === "bottom-left" || this.position === "bottom-right") {
            return false;
        }
        return true; // Default true
    }

    /**
     * @description Get the class of the top-level notification box <div>
     * @returns {String} HTML class
     */
    _getClass() {
        let _class = "popup shadow ";
        if(this.position === "" || this.position === "top-right" // Default
                                || this.position === "bottom-right") {
            _class += "right ";
        } else if (this.position === "top-left" || this.position === "bottom-left") {
            _class += "left ";
        }
        _class += (this.closed ? "hidden " : "");
        return _class;
    }

    /**
     * @description renders the DOM structure described in the element template into the shadow root
     * For example, <beer-notification-lit></beer-notification-lit> is the custom element (host)
     * The template rendered will be attached to the shadow root of the shadow DOM.
     */
    render() {
        return html`
        <div class="${this._getClass()}" style="${this._getStyle()}">
            <div class="popup-content">
                <span>
                    <img class=${this._validType() ? "icon" : ""} 
                           src=${this._getTypeIcon()}>
                    </img>
                </span>

                <p class="popup-title">${this.title}</> 

                <span class="close" style=${this.hideClose ? "display: none" : ""} 
                @click="${this._handleClose}">
                    &times;
                </span>

                <p>${this.message}</>
            </div>
        </div>
    `;
    }

    /**
     * @description CSS style evaluated once only and applied to all instances of the component
     */
    static get styles() {
        return css`
        :host {
            display: block;
            font-family: sans-serif;
            text-align: left;
        }
        /*---------------------- Notification box ----------------------*/
        .popup {
            position: fixed;
            background-color: white;
            z-index: 1;              /* In front of everything else with smaller z-indices 
                                     /* (default z-index is 0 if unspecified) */

            width: 20em;             /* Fixed width */
            height: auto;            /* Dynamically adjust height based on content */

            overflow: auto;          /* Enable scroll if needed */
            margin: 1em;
            border-radius: 0.5em;    /* Corner roundness */
        }

        /* Shadow around notification box */
        .shadow {
            /* horizontal-length, vertical-length, blur-radius, shadow-with-opacity */
            -webkit-box-shadow:  0 0 0.8em rgba(0, 0, 0, 0.1);
            -moz-box-shadow:     0 0 0.8em rgba(0, 0, 0, 0.1);
            box-shadow:          0 0 0.8em rgba(0, 0, 0, 0.1);
        }

        .hidden {
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s 0.15s, opacity 0.15s linear;
        }

        /*--------------------- Position/Animation ---------------------*/
        .right {
            right: 0;
            -webkit-animation-name: animateright;
            -webkit-animation-duration: 0.4s;
            animation-name: animateright;
            animation-duration: 0.4s;
        }

        .left {
            left: 0;
            -webkit-animation-name: animateleft;
            -webkit-animation-duration: 0.4s;
            animation-name: animateleft;
            animation-duration: 0.4s;
        }

        /* Add Animation */
        @-webkit-keyframes animate-right { /* From right to left */
        from {right:-300px; opacity:0} 
        to {right:0; opacity:1}
        }

        @keyframes animateright {
        from {right:-300px; opacity:0}
        to {right:0; opacity:1}
        }

        @-webkit-keyframes animate-left { /* From left to right */
        from {left:-300px; opacity:0} 
        to {left:0; opacity:1}
        }
        
        @keyframes animateleft {
        from {left:-300px; opacity:0}
        to {left:0; opacity:1}
        }

        /*--------------------- Notification Content ---------------------*/
        .popup-content {
            margin: auto;
            width: 90%;
        }
        .icon {
            width: 1.3em;
            height: 1.3em;
            float: left;
            padding: 0 0.7em 0 0;
        }
        .popup-title {
            font-weight: bold;
        }

        /*----------------------- The Close Button ----------------------*/
        .close {
            color: #a8a8a8;
            float: right;
            font-size: 28px;
            transition: 0.1s;
        }
        .close:hover, .close:focus {
            color: #636363;
            text-decoration: none;
            cursor: pointer;
        }
        `;
    }
}

window.customElements.define("beer-notification-lit", BeerNotificationLit);