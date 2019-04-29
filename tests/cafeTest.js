
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Selector } from 'testcafe'
fixture`Getting Started`
  .page`http://devexpress.github.io/testcafe/example`

test('My first wee baby test', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .typeText('#comments', 'helllo I hope dis works or else im totally lost')
    .click('#submit-button')
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!')
  // const articleHeader = await Selector('.result-content').find('h1')
  // let headerText = await articleHeader.innerText
})
