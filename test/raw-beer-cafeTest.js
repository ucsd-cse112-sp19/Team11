/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {Selector} from "testcafe";
fixture `Getting Started`
    .page `http://localhost:5500/src/Raw-Button/incrementTest.html`;

/**
 * Once id's are implemented, will need to refactor the code to select proper
 * beer-button elements
 */
const rawBeer = Selector("beer-button"); 

test("Verify component has attribute", async t => {
    
    await t 
        .expect(rawBeer.hasAttribute("increment")).eql(true)
        .expect(rawBeer.hasAttribute("decrement")).eql(false);
}); 

test("Test click increments the value", async t => {
    const box = await Selector("#number");    
    await t
        .click(rawBeer).click(rawBeer).click(rawBeer)
        .expect(box.value).eql("3");
});

