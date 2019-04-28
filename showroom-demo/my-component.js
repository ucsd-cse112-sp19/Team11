customElements.define('my-component', class extends HTMLElement {

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = '❤️<span></span>❤️'
    this._message = ''
  }

  static get observedAttributes() {
    return ['message']
  }

  attributeChangedCallback() {
    this.message = this.getAttribute('message')
  }

  set message(value) {
    if (value !== this._message) {
      this._message = value
      this.render()
      this.dispatchEvent(new Event('message-changed'))
    }
  }

  get message() {
    return this._message;
  }

  render() {
    this.shadowRoot.querySelector('span').textContent = this._message
  }

})