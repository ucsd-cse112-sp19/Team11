import{LitElement,html,css}from"https://unpkg.com/lit-element@2.0.1/lit-element.js?module";var types=[{type:"success",svg:"./node_modules/beer-library/icons/notif-icon-success.svg"},{type:"warning",svg:"./node_modules/beer-library/icons/notif-icon-warning.svg"},{type:"danger",svg:"./node_modules/beer-library/icons/notif-icon-danger.svg"},{type:"info",svg:"./node_modules/beer-library/icons/notif-icon-info.svg"},{type:"message",svg:"./node_modules/beer-library/icons/notif-icon-message.svg"},{type:"mail",svg:"./node_modules/beer-library/icons/notif-icon-mail.svg"}];const spacing=10,delay=200;class BeerNotificationLit extends LitElement{static get properties(){return{type:{type:String,reflect:!0},title:{type:String,reflect:!0},message:{type:String,reflect:!0},duration:{type:Number,reflect:!0},hideClose:{type:Boolean,reflect:!0},position:{type:String,reflect:!0},closed:{type:Boolean},verticalOffset:{type:Number}}}constructor(){super(),this.type="",this.title="",this.message="",this.duration=4500,this.position="",this.offset=0,this.hideClose=this.getAttribute("hideClose"),this.closed=!1,this.verticalOffset=0,this.message=this.textContent}firstUpdated(){let t,e=document.getElementsByTagName("beer-notification-lit");for(var i=0;(t=e.item(i))!==this;i++){let e=t.shadowRoot.querySelector(".popup"),i=window.getComputedStyle(e,null).getPropertyValue("height"),o=parseFloat(i.replace(/px/gi,""));this.verticalOffset+=o+spacing}}connectedCallback(){super.connectedCallback(),0!=this.duration&&window.setTimeout(()=>{this.closed=!0,window.setTimeout(()=>{this._recalculateOffset(),this._removeFromDom(this)},delay)},this.duration)}_getTypeIcon(){let t=types.find(t=>{return t.type===this.type});return void 0!==t?t.svg:""}_validType(){let t=!1;return types.find(e=>{e.type===this.type&&(t=!0)}),t}_removeFromDom(t){t.parentNode.removeChild(t)}_handleClose(t){this.closed=!0,window.setTimeout(()=>{this._recalculateOffset(),this._removeFromDom(this)},delay)}_recalculateOffset(){let t,e=document.getElementsByTagName("beer-notification-lit"),i=this.shadowRoot.querySelector(".popup"),o=window.getComputedStyle(i,null).getPropertyValue("height"),s=parseFloat(o.replace(/px/gi,""));for(var n=e.length-1;(t=e.item(n))!==this;n--)t.verticalOffset-=s+spacing}_getStyle(){var t="";return this._isTop()?t+="top: "+this.verticalOffset+"px;":t+="bottom: "+this.verticalOffset+"px;",t}_isTop(){return""===this.position||"top-right"===this.position||"top-left"===this.position||"bottom-left"!==this.position&&"bottom-right"!==this.position}_getClass(){let t="popup shadow ";return""===this.position||"top-right"===this.position||"bottom-right"===this.position?t+="right ":"top-left"!==this.position&&"bottom-left"!==this.position||(t+="left "),t+=this.closed?"hidden ":""}render(){return html`
        <div class="${this._getClass()}" style="${this._getStyle()}">
            <div class="popup-content">
                <span>
                    <img class=${this._validType()?"icon":""} 
                           src=${this._getTypeIcon()}>
                    </img>
                </span>

                <p class="popup-title">${this.title}</> 

                <span class="close" style=${this.hideClose?"display: none":""} 
                @click="${this._handleClose}">
                    &times;
                </span>

                <p>${this.message}</>
            </div>
        </div>
    `}static get styles(){return css`
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
        `}}window.customElements.define("beer-notification-lit",BeerNotificationLit);