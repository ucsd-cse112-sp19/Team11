/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {Selector, ClientFunction} from "testcafe";

/* ================================================= */
/**
 * MAKE SURE TO CHANGE THIS VALUE BEFORE PUSHING
 */
const LOCAL_DEV = false;
/* ================================================= */


if(!LOCAL_DEV) {
    fixture `Getting Started`
        .page `https://ucsd-cse112.github.io/Team11/incrementTest.html`;
} else {
    fixture `Getting Started`
        .page `localhost:5500/src/Raw-Button/incrementTest.html`;
}

/**
 * Grab the id of the component that you wish to test
 * Check if tab attribute exists and clicking opens a new tab
 *//*
test("Clicking the button will open a new tab", async t => {

});
*/

/**
 * Grab the id of the component that you wish to test, check for <link> attribute in shadowDom
 */
test("Button should have its own custom style", async t => {
    const link = Selector(() => document.querySelector("#style-beer").shadowRoot.querySelector("link"));
    
    await t
        .expect(link).notEql(undefined)
        .expect(link.hasAttribute("rel")).eql(true)
        .expect(link.getAttribute("type")).eql("text/css");     
});

/**
 * Grab the id of the component to be tested and the DOM element the component is pointing to
 * Clicking the disabled button should not change the value
 */
test("Disable button should not let the button do anything", async t => {
    const disableBeer = Selector("#disabled-beer");
    const box = await Selector("#number");    
    await t
        .expect(box.value).eql("0")
        .click(disableBeer).click(disableBeer).click(disableBeer)
        .expect(box.value).eql("0");
});

/**
 * Grab the id of the component to be tested and confirm it has the attribute
 */
test("Verify component has increment attribute", async t => {
    const incBeer = Selector("#increment-beer");
    
    await t 
        .expect(incBeer.hasAttribute("increment")).eql(true)
        .expect(incBeer.hasAttribute("decrement")).eql(false);
}); 

/**
 * Grab the id of the component to be tested and the DOM element the component is pointing to
 * Clicking the increment button should increment the value by 1 per click
 */
test("Test click increments the value", async t => {
    const incBeer = Selector("#increment-beer");
    const box = await Selector("#number");    
    await t
        .expect(box.value).eql("0")
        .click(incBeer).click(incBeer).click(incBeer)
        .expect(box.value).eql("3");
});

/**
 * Grab the id of the component to be tested and confirm it has the attribute
 */
test("Verify component has decrement attribute", async t => {
    const decBeer = Selector("#decrement-beer");
    await t
        .expect(decBeer.hasAttribute("decrement")).eql(true)
        .expect(decBeer.hasAttribute("increment")).eql(false);
});

/**
 * Grab the id of the component to be tested and the DOM element the component is pointing to
 * Clicking the increment button should decrement the value by 1 per click
 */
test("Test click decrements the value", async t => {
    const decBeer = Selector("#decrement-beer");
    const box = await Selector("#decnumber");   
    await t
        .expect(box.value).eql("0")
        .click(decBeer).click(decBeer).click(decBeer)
        .expect(box.value).eql("-3");
});

/**
 * Grab the id of the component to be tested
 * Clicking the link button should redirect the page
 */
test("Button link should redirect to new location", async t => {   
    const linkBeer = Selector("#link-beer"); 
    const getPageURL = ClientFunction( () => window.location.href );
    await t
        .click(linkBeer)
        .expect(getPageURL()).contains("/test.html");
});

