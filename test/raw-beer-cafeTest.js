/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {Selector} from "testcafe";
fixture `Getting Started`
    .page `https://ucsd-cse112.github.io/Team11/incrementTest.html`;

/**
 * Once id's are implemented, will need to refactor the code to select proper
 * beer-button elements
 */
const rawBeer = Selector("beer-button");

// const incBeer = Selector("#increment-beer");
// const decBeer = Selector("#decrement-beer");



test("Verify component has increment attribute", async t => {
    
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


/* Tests once ID is implemented
test("Verify component has decrement attribute", async t => {
    await t
        .expect(decBeer.hasAttribute("decrement")).eql(true)
        .expect(decBeer.hasAttribute("increment")).eql(false);
});

test("Test click decrements the value", async t => {
    const box = await Selector("#decnumber"); // grabs the form  
    await t
        .click(decBeer).click(decBeer).click(decBeer)
        .expect(box.value).eql("-3");
});
*/