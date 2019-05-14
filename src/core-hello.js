// THIS IS JUST A DUMMY FILE TO GET SHOWROOM TO LOAD FOR NOW
customElements.define('core-hello', class extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = '❤️<span></span>❤️'
    this._message = 'Hello World'
    this._name = ''
  }

  static get observedAttributes () {
    return ['name']
  }

  attributeChangedCallback () {
    this.name = this.getAttribute('name')
  }

  set name (value) {
    if (value !== this._message) {
      this._message = value
      this.render()
      this.dispatchEvent(new Event('message-changed'))
    }
  }

  get name () {
    return this._message
  }

  render () {
    this.shadowRoot.querySelector('span').textContent = this._message + ' ' + this._name
  }
})
