import{LitElement,html,css}from"https://unpkg.com/lit-element@2.0.1/lit-element.js?module";const types=[{type:"primary",bgColor:"#409EFF",bgLighter:"#8CC5FF",bgPlain:"#ECF5FF"},{type:"success",bgColor:"#67C23A",bgLighter:"#A3DA88",bgPlain:"#F0F9EB"},{type:"info",bgColor:"#909399",bgLighter:"#BCBEC2",bgPlain:"#F4F4F5"},{type:"warning",bgColor:"#F4A338",bgLighter:"#F8C887",bgPlain:"#FDF6EC"},{type:"danger",bgColor:"#F56C6C",bgLighter:"#F9A6A6",bgPlain:"#FEF0F0"}];var idx=0;class BeerButtonLit extends LitElement{static get properties(){return{type:{type:String,reflect:!0},text:{type:String,reflect:!0},size:{type:String,reflect:!0},disabled:{type:Boolean,reflect:!0},loading:{type:Boolean,reflect:!0},round:{type:Boolean,reflect:!0},circle:{type:Boolean,reflect:!0}}}constructor(){super(),this.type="",this.size="",this.loading=!1,this.disabled=!1,this.round=!1,this.circle=!1;var t=document.getElementsByTagName("beer-button-lit").item(idx);idx++,this.text=t.textContent;var e=t.getAttribute("loading"),i=t.getAttribute("disabled");""==e&&(this.loading=!0),""==i&&(this.disabled=!0)}static get styles(){return css`
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
    `}_getClass(){let t="";return this.round&&(t+="round "),this.circle&&(t+="circle "),this.loading|this.disabled&&(t+="unclickable "),this.isDefault||(t+="nonDefault ","medium"==this.size?t+="medium ":"small"==this.size?t+="small ":"mini"==this.size&&(t+="mini ")),t}_getStyle(){let t="";if(!(""===this.type)){let e="background-color:",i="border:",s="color:";t=(e+=types.find(t=>{return t.type===this.type}).bgColor+";")+(i+="none;")+(s+="white;")}return this.loading&&(t+="cursor: default;"),t}_validType(){let t=!1;return types.find(e=>{e.type===this.type&&(t=!0)}),t||this.isDefault}_clickHandler(){alert("You clicked the button!")}render(){return this._validType()||(this.type=""),this.loading?(this.circle||(this.text="Loading"),html`
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <button class=${this._getClass()} style=${this._getStyle()}>
            <i class="fa fa-spinner fa-spin"></i>
            ${this.text}
            </button>
            `):html`
        <div style=${this.disabled?"cursor: not-allowed":""}>
            <button class=${this._getClass()} style=${this._getStyle()} @click=${this._clickHandler}>
            ${this.text}
            </button>
        </div>
        `}}customElements.define("beer-button-lit",BeerButtonLit);