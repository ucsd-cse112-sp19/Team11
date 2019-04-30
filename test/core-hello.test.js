/* eslint-disable no-undef */
/* eslint-disable node/no-deprecated-api */
const showroom = require('showroom/puppeteer')()
const assert = require('assert')

describe('core-hello', () => {
  before(async () => {
    await showroom.start()
  })

  after(async () => {
    await showroom.stop()
  })

  beforeEach(async () => {
    await showroom.setTestSubject('core-hello')
  })
  /*
    it('Should update message', async () => {
      await showroom.setAttribute('message', 'New Message')
      const innerSpan = await showroom.find('//span')
      const text = await showroom.getTextContent(innerSpan)
      assert.equal(text, 'New Message')
    })

    it('Should dispatch event when message is updated', async () => {
      await showroom.setAttribute('message', 'New Message')
      const events = await showroom.getEventList()
      assert.equal(events.length, 1)
      assert.equal(events[0].type, 'message-changed')
    })
    */

  it('Should say Hello World by default', async () => {
    const innerP = await showroom.find('//p')
    const text = await showroom.getTextContent(innerP)
    assert.equal(text, 'Hello World')
  })

  it('Should update lang to en', async () => {
    await showroom.setAttribute('lang', 'en')
    const innerP = await showroom.find('//p')
    const text = await showroom.getTextContent(innerP)
    assert.equal(text, 'Hello World')
  })

  it('Should update lang to ko', async () => {
    await showroom.setAttribute('lang', 'ko')
    const innerP = await showroom.find('//p')
    const text = await showroom.getTextContent(innerP)
    assert.equal(text, '안녕하세요')
  })

  it('Lang should be set to ja by default', async () => {
    const tag = await showroom.getAttribute('lang')
    const innerP = await showroom.find('//p')
    const text = await showroom.getTextContent(innerP)
    assert.equal(tag, 'ja')
    assert.equal(text, 'こんにちは')
  })

  it('Should say hello to the name', async () => {
    // TODO find out how to pull textcontent of <core-hello> to test against
    // should say "Hello World <name>"
  })

  it('Font size should be 16 by default', async () => {
    const size = await showroom.getAttribute('font-size')
    assert.equal(size, 16)
  })

  it('Should update font size to 42', async () => {
    const unchanged = await showroom.getAttribute('font-size')
    await showroom.setAttribute('font-size', 42)
    const changed = await showroom.getAttribute('font-size')
    assert.notEqual(unchanged, changed)
  })
})
