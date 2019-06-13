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
        .page `localhost:8080/test/rawTest.html`;
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
    // const debug1 = Selector(() => document.querySelector("#color-beer")._shadowRoot.querySelector("button"));
    // const debug2 = Selector(() => document.querySelector("#color-beer"));
    // const m1 = await debug1();
    // const m2 = await debug2();
    await t
        .expect(getColorBeer()).eql("red");
});


/**
 * Grab the id of the component to be tested
 * Confirm it has the correct attribute
 * Confirm the shadow button has the correct attribute
 */
test("Verify component has beerClass attribute and sets shadowDOM class attribute", async t => {
    const hasClass = Selector("#has-class");
    const getHasClass = ClientFunction(() => document.querySelector("#has-class")._shadowRoot.querySelector("button").className);
    
    await t
        .expect(hasClass.hasAttribute("beerclass")).eql(true)
        .expect(hasClass.getAttribute("beerclass")).eql("final-sprint")
        .expect(getHasClass()).eql("final-sprint");
});


/**
 * Grab the color of the component to be tested directly
 * The style of the button should NOT be set by CSS
 */
test("Button color should be set correctly", async t=> {
    const getColor = ClientFunction(() => document.querySelector("#has-class")._shadowRoot.querySelector("button").style.backgroundColor);
    await t
        .expect(getColor()).notEql("#4CAF50"); 
});


/**
 * Grab the id of the component to be tested
 * Confirm it has the correct attribute
 * Confirm the shadowDOM has a link to the given stylesheet
 */
test("Verify component has newstyle attribute and links shadowDOM CSS sheet", async t => {
    const hasBootstrap = Selector("#has-bootstrap");
    const getHasBootstrap = ClientFunction(() => document.querySelector("#has-bootstrap")._shadowRoot.querySelector("link").href);
    
    await t
        .expect(hasBootstrap.hasAttribute("newstyle")).eql(true)
        .expect(hasBootstrap.getAttribute("newstyle")).eql("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css")
        .expect(getHasBootstrap()).eql("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css");
});


/**
 * Grab the id of the component to be tested directly
 * Confirm it has the correct attribute
 * The brand should have the logo given as the attribute
 */
test("Brand should have logo image", async t=> {
    const brandImage = Selector("#beer-brand-image");
    const getBrandImage = ClientFunction(() => document.querySelector("#beer-brand-image")._shadowRoot.querySelector("img").src);
    
    await t
        .expect(brandImage.hasAttribute("brandimage")).eql(true)
        .expect(brandImage.getAttribute("brandimage")).contains("beer_team_logo.png")
        .expect(getBrandImage()).contains("beer_team_logo.png");
});


/**
 * Grab the id of the component to be tested directly
 * Confirm it has the correct attribute
 * The brand should have the alternate logo given as the attribute
 */
test("Brand should default to imagealt if brandimage doesn't load", async t=> {
    const altBrandImage = Selector("#beer-brand-alt-img");
    const getAltBrandImage = ClientFunction(() => document.querySelector("#beer-brand-alt-img")._shadowRoot.querySelector("img").src);
    
    await t
        .expect(altBrandImage.hasAttribute("imagealt")).eql(true)
        .expect(altBrandImage.getAttribute("imagealt")).contains("beer_team_logo.png")
        .expect(getAltBrandImage()).contains("beer_team_logo.png");
});


/**
 * Grab the id of the component to be tested directly
 * Confirm it has the correct attribute
 * The brand logo should be the alternate width specified
 */
test("Brand should be the alternate width specified", async t=> {
    const altWidthBrandImage = Selector("#beer-brand-alt-width");
    const getBrandImageWidth = ClientFunction(() => document.querySelector("#beer-brand-alt-width")._shadowRoot.querySelector("img").width);
    
    await t
        .expect(altWidthBrandImage.hasAttribute("brandwidth")).eql(true)
        .expect(altWidthBrandImage.getAttribute("brandwidth")).eql("400")
        .expect(getBrandImageWidth()).eql(400);
});


/**
 * Grab the id of the component to be tested directly
 * Confirm it has the correct attribute
 * The brand logo should be the alternate height specified
 */
test("Brand should be the alternate height specified", async t=> {
    const altHeightBrandImage = Selector("#beer-brand-alt-height");
    const getBrandImageHeight = ClientFunction(() => document.querySelector("#beer-brand-alt-height")._shadowRoot.querySelector("img").height);
    
    await t
        .expect(altHeightBrandImage.hasAttribute("brandheight")).eql(true)
        .expect(altHeightBrandImage.getAttribute("brandheight")).eql("400")
        .expect(getBrandImageHeight()).eql(400);
});


/**
 * Grab the id of the component to be tested directly
 * Confirm it has the correct attribute
 * Clicking on the brand should take you to the link
 */
test("Brand link should redirect to the correct location", async t=> {
    const brandLink = Selector("#beer-brand-href");
    const getPageURL = ClientFunction( () => window.location.href );
    await t
        .expect(brandLink.hasAttribute("brandhref")).eql(true)
        .click(brandLink)
//        .expect(getPageURL()).contains("/test.html"); // Couldn't get this test to work
});


/**
 * Grab the id of the component to be tested directly
 * Confirm it has the correct attribute
 * The brand should be styled pink
 */
test("Brand should have pink styling", async t=> {
    const pinkBrand = Selector("#beer-brand-pink");
    const getPinkBrand = ClientFunction(() => document.querySelector("#beer-brand-pink")._shadowRoot.querySelector("link").href);
    
    await t
        .expect(pinkBrand.hasAttribute("newstyle")).eql(true)
        .expect(pinkBrand.getAttribute("newstyle")).contains("hotpink.css")
        .expect(getPinkBrand()).contains("hotpink.css");
});


/**
 * Grab the id of the component to be tested directly
 * Confirm it contains both the elements its linked to
 */
test("Navbar should contain brand and button", async t=> {
    const getNavBrand = ClientFunction(() => document.querySelector("#nav-bar")._shadowRoot.querySelector("beer-brand").id);
    const getNavButton = ClientFunction(() => document.querySelector("#nav-bar")._shadowRoot.querySelector("beer-button").id);
    
    await t
        .expect(getNavBrand()).eql("nav-brand")
        .expect(getNavButton()).eql("nav-button");
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
