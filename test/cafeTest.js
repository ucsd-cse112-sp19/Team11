
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Selector } from 'testcafe'
fixture`Getting Started`
  .page`https://ucsd-cse112.github.io/Team11/`

test('test attribute rainbow', async t => {
  const coreHello = await Selector('core-hello')
  // const p = await Selector('#hello')
  await t
    // .expect(coreHello.exists).eql(true)//works
    .expect(coreHello.hasAttribute('rainbow')).eql(true)
    // .expect(p.exists).eql(true)
    // v.expect(coreHello.hasAttribute('blackpink')).eql(true)
    // .expect(Selector('#shadow-root').innerText).eql('Hello world blackpink')
    // const articleHeader = await Selector('.result-content').find('h1')
    // let headerText = await articleHeader.innerText
})

test('test if core-hello element exists', async t => {
  const coreHello = await Selector('core-hello')
  await t
    .expect(coreHello.exists).eql(true)
})

test('Testing input for component', async t => {
  await Selector('core-hello')
  const p = await Selector(() => document.querySelector('core-hello').shadowRoot.querySelector('#hello'))
  await t
    .expect(p.exists).eql(true)
    .expect(p.innerText).eql('Hello world blackpink')
})
