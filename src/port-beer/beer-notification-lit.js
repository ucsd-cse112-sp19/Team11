import {LitElement, html, css} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

var types = [
    {type: "success", svg: "./svg/notif-icon-success.svg"},
    {type: "warning", svg: "./svg/notif-icon-warning.svg"},
    {type: "danger",  svg: "./svg/notif-icon-danger.svg"},
    {type: "info",    svg: "./svg/notif-icon-info.svg"},
];
var total_notifs = 0;

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
            offset: {type: Number, reflect: true},

            // Boolean property to keep track of whether the notification is closed or not
            closed: {type: Boolean},

            // Index of the notification component, useful when there are multiple components
            index:  {type: Number},

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
        
        // if closed before notification naturally times out then hide it until timer finishes and 
        // it gets removed from the DOM
        this.hidden = false;

        // Default properties (unrelated to attributes)
        
        // By default the notification is not closed.
        // This will become true when user clicks on X, or duration time is up
        this.closed = false;
        this.prevHeights = 0; 

        var beer_notif_lit = document.getElementsByTagName("beer-notification-lit").item(total_notifs);

        // Increment the index for each new beer-button component
        this.index = total_notifs;
        total_notifs++;

        // Set the message property with the user text in between tag
        // <beer-notification-lit>USER MESSAGE</beer-notification-lit>
        this.message = beer_notif_lit.textContent;

    }

    /**
     * @description Perform one-time work after the element’s template has been created.
     */
    firstUpdated() {
        // Calculate the appropriate offset from the top of the screen.
        // This for-loop cumulatively adds the heights of each notification box that comes
        // before "this" notification
        for( var i = 0; i < this.index; i++ ) {
            // Get the current beer-notification-lit component with index i
            let curr = document.getElementsByTagName("beer-notification-lit").item(i);

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
            this.prevHeights += (notif_height_value + 10);
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
            window.setTimeout(() => {
                this.closed = true;
                this._recalculateOffset();
            }, this.duration);
        }
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

    /**
     * @description Handles a click event on the top-right 'x'. CLoses the notification.
     * @param {*} event 
     */
    _handleClose(event) {
        // console.log(event.target); // Prints the element that this event is attached to
        // In this case, will print out <span>&times;</span> because when we click on
        // the 'x', the notification box will close (this event fires)
        this.closed = true;
        this._recalculateOffset();

    }

    /**
     * @description Recalulate offset from top. 
     * When closing a notification, the ones below it will shift up.
     */
    _recalculateOffset() {
        // Start from bottom to up
        for( var i = total_notifs - 1; i > this.index; i-- ) {
            // Get the current beer-notification-lit component with index i
            let curr = document.getElementsByTagName("beer-notification-lit").item(i);
            // Get the beer-notification-lit component that will close
            let removed = document.getElementsByTagName("beer-notification-lit").item(this.index);

            // Get the <div class=".popup"></div> for the removed component
            let removedDiv = removed.shadowRoot.querySelector(".popup");
            // Get the height style string (Example: "123.4px")
            let notif_height_removed = window.getComputedStyle(removedDiv, null).getPropertyValue("height");
            // Convert from string to number (Example: "123.4px" --> 123.4)
            let notif_height_value_removed = parseFloat(notif_height_removed.replace(/px/gi, ""));

            // Update current component's offset
            curr.prevHeights -= (notif_height_value_removed + 10);
        }
    }

    /**
     * @description Determine the dynamic CSS styling of the top-level notification box div
     */
    _getStyle() {
        var notif_box_style = ""; // Default nothing
        notif_box_style += (this.closed ? "display: none;" : "display: block;");
        notif_box_style += "position: fixed;";

        notif_box_style += "top: " + this.prevHeights + "px;";
        return notif_box_style;
    }

    _getClass() {
        let _class = "popup shadow ";
    }

    render() {
        return html`
        <div class="popup shadow" style="${this._getStyle()}">
            <div class="popup-content">
                <span>
                    <img class=${this._validType() ? "icon" : ""} 
                           src=${this._getTypeIcon()}>
                    </img>
                </span>
                <p class="popup-title">${this.title}</> 
                <span class="close" @click="${this._handleClose}">&times;</span>
                <p>${this.message}</>
            </div>
        </div>
    `;
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
            /*position: fix;*/     /* Stay in place on screen */
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
            -webkit-animation-name: animateright;
            -webkit-animation-duration: 0.4s;
            animation-name: animateright;
            animation-duration: 0.4s;
        }
        /* Add Animation */
        @-webkit-keyframes animate-right {
        from {right:-300px; opacity:0} 
        to {right:0; opacity:1}
        }
        @keyframes animateright {
        from {right:-300px; opacity:0}
        to {right:0; opacity:1}
        }
        /* Shadow around notification box */
        .shadow {
            /* horizontal-length, vertical-length, blur-radius, shadow-with-opacity */
            -webkit-box-shadow:  0em 0em 0.8em rgba(0, 0, 0, 0.1);
            -moz-box-shadow:     0em 0em 0.8em rgba(0, 0, 0, 0.1);
            box-shadow:          0em 0em 0.8em rgba(0, 0, 0, 0.1);
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
            transition: 0.1s;
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
}

window.customElements.define("beer-notification-lit", BeerNotificationLit);
