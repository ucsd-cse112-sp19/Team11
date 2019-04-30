
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Selector } from 'testcafe'
fixture`Getting Started`
  .page`https://ucsd-cse112.github.io/Team11/`

test('My first wee baby test', async t => {
  const coreHello = await Selector('core-hello')
  const p = await Selector('#hello')
  await t
    // .typeText('#developer-name', 'John Smith')
    // .typeText('#comments', 'helllo I hope dis works or else im totally lost')
    // .click('#submit-button')
    // helloWorld = Selector('.core-hello').exists
    .expect(coreHello.exists).eql(true)//works
    .expect(coreHello.hasAttribute('rainbow')).eql(true)//works
    .expect(p.exists).eql(true)//broke 
    .expect(coreHello.hasAttribute('blackpink')).eql(true)//broke 
    // .expect(Selector('#shadow-root').innerText).eql('Hello world blackpink')
    // const articleHeader = await Selector('.result-content').find('h1')
    // let headerText = await articleHeader.innerText
})
