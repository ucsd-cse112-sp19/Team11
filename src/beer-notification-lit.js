import {LitElement, html, css} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

class BeerNotificationLit extends LitElement {
    static get properties() {
        return {
            type:     {type: String, reflect: true},
            text:     {type: String, reflect: true}
            // TODO: Add properties as needed
        };
    }

    constructor() {
        super();
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