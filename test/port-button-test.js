/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {Selector, ClientFunction} from "testcafe";

fixture `fixture`
    .page("http://localhost/testcafe/");



/* ================================================= */
/**
 * MAKE SURE TO CHANGE THIS VALUE BEFORE PUSHING
 */
const LOCAL_DEV = true;
/* ================================================= */


if(!LOCAL_DEV) {
    fixture `Getting Started`
        .page `https://ucsd-cse112.github.io/Team11/beer-button-lit.html`;
} else {
    fixture `Getting Started`
        .page `http://localhost:8080/test-fixtures/beer-button-lit-test.html`;
}
 
const getPageURL = ClientFunction( () => window.location.href );



const animatedButton = Selector("#animated");
const defaultButton = Selector("#plain");
const primaryButton = Selector("#primary");
const successButton = Selector("#success");
const infoButton = Selector("#info");
const warnButton = Selector("#warning");
const dangerButton = Selector("#danger");
const miniButton = Selector("#mini-me");
const smallButton = Selector("#smol");
const mediumButton = Selector("#medi");
const roundButton = Selector("#rounded");
const circleButton = Selector("#circular");
const disabledButton = Selector("#round-success");
const breakButton = Selector("#circle-danger");
const invalidButton = Selector("#broken");

test("Attribute testing: components have correct type", async t => {
    await t 
        .expect(animatedButton.getAttribute("type")).eql("")
        .expect(defaultButton.getAttribute("type")).eql("")
        .expect(primaryButton.getAttribute("type")).eql("primary")
        .expect(smallButton.getAttribute("type")).eql("")
        .expect(roundButton.getAttribute("type")).eql("")
        .expect(circleButton.getAttribute("type")).eql("");
});

test("Attribute testing: components have intended text", async t => {
    await t
        .expect(defaultButton.getAttribute("text")).eql("")
        .expect(primaryButton.getAttribute("text")).eql("Primary")
        .expect(successButton.getAttribute("text")).eql("Success")
        .expect(mediumButton.getAttribute("text")).eql("Im Medium")
        .expect(roundButton.getAttribute("text")).eql("beer")
        .expect(circleButton.getAttribute("text")).eql("");
});

test("Attribute Testing: verify button size", async t => {
    await Selector("#mini-me"); const mi = await Selector(() => document.querySelector("#mini-me").shadowRoot.querySelector("button"));
    await Selector("#round-success"); const inv = await Selector(() => document.querySelector("#round-success").shadowRoot.querySelector("button"));
    await Selector("#smol"); const sm = await Selector(() => document.querySelector("#smol").shadowRoot.querySelector("button"));
    await Selector("#medi"); const me = await Selector(() => document.querySelector("#medi").shadowRoot.querySelector("button"));

    await t 
        .expect(miniButton.getAttribute("size")).eql("mini")
        .expect(mi.getStyleProperty("transform")).eql("matrix(0.7, 0, 0, 0.7, 0, 0)")
        .expect(disabledButton.getAttribute("size")).eql("mini")
        .expect(inv.getStyleProperty("transform")).eql("matrix(0.7, 0, 0, 0.7, 0, 0)")
        .expect(smallButton.getAttribute("size")).eql("small")
        .expect(sm.getStyleProperty("transform")).eql("matrix(0.8, 0, 0, 0.8, 0, 0)")
        .expect(mediumButton.getAttribute("size")).eql("med")
        .expect(me.getStyleProperty("transform")).eql("none");
}); 

test("Attribute testing: verify button color", async t => {
    await Selector("#plain"); const plain = await Selector(() => document.querySelector("#plain").shadowRoot.querySelector("button"));
    await Selector("#primary"); const primary = await Selector(() => document.querySelector("#primary").shadowRoot.querySelector("button"));
    await Selector("#success"); const success = await Selector(() => document.querySelector("#success").shadowRoot.querySelector("button"));
    await Selector("#info"); const info = await Selector(() => document.querySelector("#info").shadowRoot.querySelector("button"));
    await Selector("#warning"); const warning = await Selector(() => document.querySelector("#warning").shadowRoot.querySelector("button"));
    await Selector("#danger"); const danger = await Selector(() => document.querySelector("#danger").shadowRoot.querySelector("button"));

    await t 
        .expect(plain.getStyleProperty("background-color")).eql("rgb(255, 255, 255)")
        .expect(primary.getStyleProperty("background-color")).eql("rgb(64, 158, 255)")
        .expect(success.getStyleProperty("background-color")).eql("rgb(103, 194, 58)")
        .expect(info.getStyleProperty("background-color")).eql("rgb(144, 147, 153)")
        .expect(warning.getStyleProperty("background-color")).eql("rgb(244, 163, 56)")
        .expect(danger.getStyleProperty("background-color")).eql("rgb(245, 108, 108)");
});

test("Attribute testing: verify button roundness", async t => {
    await Selector("#round-success"); const success = await Selector(() => document.querySelector("#round-success").shadowRoot.querySelector("button"));
    await Selector("#rounded"); const round = await Selector(() => document.querySelector("#rounded").shadowRoot.querySelector("button"));
    await Selector("#circular"); const circle = await Selector(() => document.querySelector("#circular").shadowRoot.querySelector("button"));

    await t 
        .expect(success.hasClass("round")).ok()
        .expect(success.getStyleProperty("border-bottom-left-radius")).eql("35px")
        .expect(success.getStyleProperty("border-bottom-right-radius")).eql("35px")
        .expect(success.getStyleProperty("border-top-left-radius")).eql("35px")
        .expect(success.getStyleProperty("border-bottom-right-radius")).eql("35px")
        .expect(round.hasClass("round")).ok()
        .expect(round.getStyleProperty("border-bottom-left-radius")).eql("35px")
        .expect(round.getStyleProperty("border-bottom-right-radius")).eql("35px")
        .expect(round.getStyleProperty("border-top-left-radius")).eql("35px")
        .expect(round.getStyleProperty("border-bottom-right-radius")).eql("35px")
        .expect(circle.hasClass("circle")).ok()
        .expect(circle.getStyleProperty("border-bottom-left-radius")).eql("50%")
        .expect(circle.getStyleProperty("border-bottom-right-radius")).eql("50%")
        .expect(circle.getStyleProperty("border-top-left-radius")).eql("50%")
        .expect(circle.getStyleProperty("border-bottom-right-radius")).eql("50%");
});

test("Function testing: loading buttons are animated and disabled", async t => {
    await Selector("#animated"); const text = await Selector(() => document.querySelector("#animated").shadowRoot.querySelector("button"));
    await Selector("#animated"); const ani = await Selector(() => document.querySelector("#animated").shadowRoot.querySelector("i"));
    await t
        .expect(text.innerText).eql(" Loading")
        // .expect(ani.hasClass('fa fa-spinner fa-spin')).eql(true)
        .setNativeDialogHandler(() => false)
        .click("#animated");
});

test("Function testing: click creates an alert", async t => {
    await t
        .setNativeDialogHandler(() => true)
        .click("#plain")
        .click("#mini-me")
        .click("#smol")
        .click("#medi")
        .click("#rounded")
        .click("#circular");
});

test("Function testing: cannot click disabled buttons", async t => {
    await t
        .setNativeDialogHandler(() => false)
        .click("#round-success")
        .click("#animated");
});
