import{LitElement,html,css}from"https://unpkg.com/lit-element@2.0.1/lit-element.js?module";import"./../Port-Notification/beer-notification-lit.js";const types=[{type:"primary",bgColor:"#409EFF",bgLighter:"#8CC5FF",bgPlain:"#ECF5FF"},{type:"success",bgColor:"#67C23A",bgLighter:"#A3DA88",bgPlain:"#F0F9EB"},{type:"info",bgColor:"#909399",bgLighter:"#BCBEC2",bgPlain:"#F4F4F5"},{type:"warning",bgColor:"#F4A338",bgLighter:"#F8C887",bgPlain:"#FDF6EC"},{type:"danger",bgColor:"#F56C6C",bgLighter:"#F9A6A6",bgPlain:"#FEF0F0"}];class BeerButtonLit extends LitElement{static get properties(){return{type:{type:String,reflect:!0},text:{type:String},size:{type:String,reflect:!0},disabled:{type:Boolean,reflect:!0},loading:{type:Boolean,reflect:!0},round:{type:Boolean,reflect:!0},circle:{type:Boolean,reflect:!0},bootstrap:{type:Boolean,reflect:!0},class:{type:String,reflect:!0},style:{type:String,reflect:!0},script:{type:String,reflect:!0},functionName:{type:String,reflect:!0}}}constructor(){super(),this.type="",this.size="",this.loading=this.hasAttribute("loading"),this.disabled=this.hasAttribute("disabled"),this.round=!1,this.circle=!1,this.bootstrap=this.hasAttribute("beerClass"),this.class="",this.style="",this.text=this.textContent,this.bootstrap&&(this.class=this.getAttribute("beerClass")),this.hasAttribute("beerStyle")&&(this.style=this.getAttribute("beerStyle"))}firstUpdated(){if(this.$button=this.shadowRoot.querySelector("button"),this.loading){let t=document.createElement("i");t.setAttribute("class","fa fa-spinner fa-spin"),this.$button.prepend(t)}}_getClass(){let t="";return this.bootstrap?t+=this.class+" ":(this.round&&(t+="round "),this.circle&&(t+="circle "),(this.loading||this.disabled)&&(t+="unclickable "),this.isDefault||(t+="nonDefault ","medium"==this.size?t+="medium ":"small"==this.size?t+="small ":"mini"==this.size&&(t+="mini "))),t}_setStyle(t){var e=document.createElement("link");this.shadowRoot.appendChild(e),e.setAttribute("rel","stylesheet"),e.setAttribute("href",t),e.setAttribute("type","text/css")}_getStyle(){let t="";var e=""===this.type;if(this.bootsrap)return"";if(!e){let e="background-color:",s="border:",i="color:";t=(e+=types.find(t=>{return t.type===this.type}).bgColor+";")+(s+="none;")+(i+="white;")}return this.loading&&(t+="cursor: default;"),""!=this.style&&(t+=this.style),t}_validType(){let t=!1;return types.find(e=>{e.type===this.type&&(t=!0)}),t||this.isDefault}_handleClick(){if(this.hasAttribute("script")&&this.hasAttribute("functionName")&&!this.loading&&!this.disabled){var t=this.script,e=this.functionName;t.length>0&&import(t).then(t=>{t[e]()}).catch(t=>t.message)}}render(){return this._validType()||(this.type=""),this.loading&&(this.circle||(this.text="Loading")),html`
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <div style=${this.disabled?"cursor: not-allowed":""}>
            <button class=${this._getClass()} style=${this._getStyle()} @click=${this._handleClick}>
            ${this.text}
            </button>
        </div>
        `}static get styles(){return css`
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
    `}}customElements.define("beer-button-lit",BeerButtonLit);