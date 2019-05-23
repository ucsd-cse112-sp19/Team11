import {LitElement, html, css} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

var types = [
    {type: "success", svg: "./svg/notif-icon-success.svg"},
    {type: "warning", svg: "./svg/notif-icon-warning.svg"},
    {type: "danger",  svg: "./svg/notif-icon-danger.svg"},
    {type: "info",    svg: "./svg/notif-icon-info.svg"},
<<<<<<< HEAD
];    

// Index to keep track of which beer-notication-lit component in a given HTML page
// when there are multiple
var idx = 0;
var count = 0;
//if we click out of a notif that also has a duration timer, we need to make sure we don't remove 
//the same notification twice so thus a removed lock? woah 120 stuff? TODO
var removed = false;
=======
];
var total_notifs = 0;
>>>>>>> 35778d8d72076cc289d2ddbba00fbfc67fb04a51

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
<<<<<<< HEAD
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

                //only remove the notification if it's present in the DOM
                if(!removed){
                    // this is passed in because it is a reference to the element that must be removed
                    this._removeFromDom(this);
                }

            }, this.duration);
        }
=======

            // Boolean property to keep track of whether the notification is closed or not
            closed: {type: Boolean},

            // Index of the notification component, useful when there are multiple components
            index:  {type: Number},

            // The cumulative offset positioning to determine the position of notification dynamically
            prevHeights:  {type: Number}


            // TODO: Add properties as needed
        };
>>>>>>> 35778d8d72076cc289d2ddbba00fbfc67fb04a51
    }

    constructor() {
        super();
<<<<<<< HEAD
        
        //our precious beer-notification
        var beer_notification_lit = document.getElementsByTagName("beer-notification-lit").item(idx);
        idx++;
        count = idx;
        // Increment the index for each new beer-button component in case of multiple

=======
>>>>>>> 35778d8d72076cc289d2ddbba00fbfc67fb04a51
        // Default attributes
        this.type = "";
        this.title = "";
        this.message = "";
<<<<<<< HEAD

        //we are removing the notif after 4500 (milliseconds?) not what is specified from user specified value
        //fixed
        var duration_len = 0;
        try{
            beer_notification_lit.getAttribute("duration");
        }catch(err){
            console.log("caught duration!");
        }

        //if the duration length is not empty we set it to be what is specified in duration attribute
        if(duration_len != 0){
            this.duration = duration_len;
        }

        //default
        this.duration = 4500;
        this.position = "";
        this.offset = 0;
        //console.log("Which notif am i on? : " + beer_notification_lit.innerHTML);

        //onClick event handler on our beer_notification element. 
        //Ideally nothing should happen when we click our own notification. I'll try to add this tmr morning (today?) TODO
         //when clicking INSIDE the notification page, the notification should disappear
         /*
         this.onclick = () => {
            let event = new CustomEvent("Clicked", {});
            self.dispatchEvent(event);
            console.log("clicked on notif")

            //attempt to prevent the "Uncaught TypeError: Cannot read property 'removeChild'
            //by using a lock but didn't work :(
            this.removed = true;

            //removed notif from the page. Can't figure out how to set 
            this._removeFromDom(beer_notification_lit);
        } 
        */

        //hides the notification after a click event is registered 
        this.addEventListener('click',hideshow,false);
        function hideshow() {
            //beer_notification_lit.style.display = 'block'; 
            this.style.display = 'none'
        }

        // Set the message property with the user text in between tag
        // <beer-notification-lit>USER MESSAGE</beer-notification-lit>
        this.message = "";

        try{
            this.message = beer_notification_lit.textContent;
        }catch(err){
            console.log("caught test content error!");
        }
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
            margin-top: 2em;
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
=======
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
>>>>>>> 35778d8d72076cc289d2ddbba00fbfc67fb04a51
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
<<<<<<< HEAD
    
    /**
     * @description It controls the stacks of notification so every 
     * notification can be showed.
     * @returns {string} style
     */
    _getStyle() {
        let _style = "z-index: 1; right: 0; top: 0;width: 20em; height: auto; margin-top:2em; overflow: auto; border-radius: 0.5em; background-color: white;";
        
        let topMargin = "";

        idx++;
        
        let margin = idx - (count+1);
        
        margin *= 8;
        
        topMargin += margin.toString(10);
        _style += "margin-top:" + topMargin +"em;";
        
        return _style;
=======

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
>>>>>>> 35778d8d72076cc289d2ddbba00fbfc67fb04a51
    }

    render() {
        return html`
<<<<<<< HEAD
        <div class="popup shadow" style=${this._getStyle()}>
=======
        <div class="popup shadow" style="${this._getStyle()}">
>>>>>>> 35778d8d72076cc289d2ddbba00fbfc67fb04a51
            <div class="popup-content">
                <span>
                    <img class=${this._validType() ? "icon" : ""} 
                           src=${this._getTypeIcon()}>
                    </img>
                </span>
                <p class="popup-title">${this.title}</> 
<<<<<<< HEAD
                <span class="close">&times;</span>
=======
                <span class="close" @click="${this._handleClose}">&times;</span>
>>>>>>> 35778d8d72076cc289d2ddbba00fbfc67fb04a51
                <p>${this.message}</>
            </div>
        </div>
    `;
    }
<<<<<<< HEAD
}

window.customElements.define("beer-notification-lit", BeerNotificationLit);
=======

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
>>>>>>> 35778d8d72076cc289d2ddbba00fbfc67fb04a51
