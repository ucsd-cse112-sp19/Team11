import{LitElement,html,css}from"https://unpkg.com/lit-element@2.0.1/lit-element.js?module";var types=[{type:"success",svg:"./svg/notif-icon-success.svg"},{type:"warning",svg:"./svg/notif-icon-warning.svg"},{type:"danger",svg:"./svg/notif-icon-danger.svg"},{type:"info",svg:"./svg/notif-icon-info.svg"}],idx=0,count=0,removed=!1;class BeerNotificationLit extends LitElement{static get properties(){return{type:{type:String,reflect:!0},title:{type:String,reflect:!0},message:{type:String,reflect:!0},duration:{type:Number,reflect:!0},position:{type:String,reflect:!0},offset:{type:Number,reflect:!0}}}connectedCallback(){super.connectedCallback(),0!=this.duration&&window.setTimeout(()=>{removed||this._removeFromDom(this)},this.duration)}constructor(){super();var t=document.getElementsByTagName("beer-notification-lit").item(idx);count=++idx,this.type="",this.title="",this.message="";var e=t.getAttribute("duration");null!=e&&(this.duration=e),this.duration=4500,this.position="",this.offset=0,this.addEventListener("click",function(){t.style.display="block",this.style.display="none"},!1),this.message=t.textContent}static get styles(){return css`
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
        `}_getTypeIcon(){let t=types.find(t=>{return t.type===this.type});return void 0!==t?t.svg:""}_validType(){let t=!1;return types.find(e=>{e.type===this.type&&(t=!0)}),t}_removeFromDom(t){t.parentNode.removeChild(t)}_getStyle(){let t="z-index: 1; right: 0; top: 0;width: 20em; height: auto; margin-top:2em; overflow: auto; border-radius: 0.5em; background-color: white;",e="",i=++idx-(count+1);return t+="margin-top:"+(e+=(i*=8).toString(10))+"em;"}render(){return html`
        <div class="popup shadow" style=${this._getStyle()}>
            <div class="popup-content">
                <span>
                    <img class=${this._validType()?"icon":""} 
                           src=${this._getTypeIcon()}>
                    </img>
                </span>
                <p class="popup-title">${this.title}</> 
                <span class="close">&times;</span>
                <p>${this.message}</>
            </div>
        </div>
    `}}window.customElements.define("beer-notification-lit",BeerNotificationLit);