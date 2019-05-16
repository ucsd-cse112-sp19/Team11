/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {Selector, ClientFunction} from "testcafe";

/* ================================================= */
/**
 * MAKE SURE TO CHANGE THIS VALUE BEFORE PUSHING
 */
const LOCAL_DEV = true;
/* ================================================= */


if(!LOCAL_DEV) {
    fixture `Getting Started`
        .page `https://ucsd-cse112.github.io/Team11/incrementTest.html`;
} else {
    fixture `Getting Started`
        .page `localhost:5500/src/Raw-Button/incrementTest.html`;
}

const getPageURL = ClientFunction( () => window.location.href );

const linkBeer = Selector("#link-beer");
const incBeer = Selector("#increment-beer");
const decBeer = Selector("#decrement-beer");
const disableBeer = Selector("#disabled-beer");

/**
 * Grab the id of the component that 
 */
test("Button should have its own custom style", async t => {
    const link = Selector(() => document.querySelector("#style-beer").shadowRoot.querySelector("link"));        
    
    await t
        .expect(link.hasAttribute("rel")).eql(true)
        .expect(link.getAttribute("type")).eql("text/css");     
    

});

/*
test("Disable button should not let the button do anything", async t => {
    const box = await Selector("#number");    
    await t
        .click(disableBeer).click(disableBeer).click(disableBeer)
        .expect(box.value).eql("0");
});

test("Verify component has increment attribute", async t => {
    
    await t 
        .expect(incBeer.hasAttribute("increment")).eql(true)
        .expect(incBeer.hasAttribute("decrement")).eql(false);
}); 

test("Test click increments the value", async t => {
    const box = await Selector("#number");    
    await t
        .click(incBeer).click(incBeer).click(incBeer)
        .expect(box.value).eql("3");
});


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


test("Button link should redirect to new location", async t => {    
    await t
        .click(linkBeer)
        .expect(getPageURL()).contains("/test.html");
});

*/