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
        .page `https://ucsd-cse112.github.io/Team11/test/rawTest.html`;
} else {
    fixture `Getting Started`
        .page `localhost:5500/test/rawTest.html`;
}


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

/**
 * Grab the id of the component to be tested
 * Clicking the link button should redirect the page
 * The page should be opened in a new tab
 */
test("Button link should redirect to new location with a new tab", async t => {
    const tabBeer = Selector("#tab-beer");
    const getPageURL = ClientFunction( () => window.location.href );
    // TestCafe doesn't support multiple tabs, so this will not work.
    const getOpenerURL = ClientFunction( () => window.opener.location.href );
    await t
        .click(tabBeer)
        .expect(getPageURL()).contains("/test.html");
    //     .expect(getOpenerURL()).contains("/incrementTest.html");
});


/**
 * Grab the color of the component to be tested directly
 * The color of the button should be equal to the attribute.
 */
test("Button color should be set correctly", async t=> {
    const getColorBeer = ClientFunction(() => document.querySelector("#color-beer")._shadowRoot.querySelector("button").style.backgroundColor);
    const debug1 = Selector(() => document.querySelector("#color-beer")._shadowRoot.querySelector("button"));
    const debug2 = Selector(() => document.querySelector("#color-beer"));
    const m1 = await debug1();
    const m2 = await debug2();
    await t
        .expect(getColorBeer()).eql("red");
});



/**
 * Grab the id of the component to be tested
 * Clicking the button should invoke the custom function,
 * which, here, is a console log.
 */
// test("Button accepts custom fuctions", async t=> {
//     const component = Selector("#custom-func-beer"); 

//     await t.click(component);
//     const messages = await t.getBrowserConsoleMessages();    
//     var msg = "";
//     if(LOCAL_DEV) {
//         msg = messages.log[1];
//     } else {
//         msg = messages.log[0];
//     }
//     await t.expect(msg).eql("hello");
// });
