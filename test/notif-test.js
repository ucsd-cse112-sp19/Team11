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
        .page `https://ucsd-cse112.github.io/Team11/beer-notification-lit.html`;
} else {
    fixture `Getting Started`
        .page `http://127.0.0.1:8080/src/beer-notification-lit.html`;
}
 
const getPageURL = ClientFunction( () => window.location.href );

const indefButton = Selector("#indefinite");
const indefSpan = Selector("#indefiniteSpan");
const defButton = Selector("#definite");
const defSpan = Selector("#definiteSpan");

test("Click indefinite button", async t => {
    await Selector("#indefNotif"); const indefNotification = Selector("#indefNotif");
    await t 
        .click(indefButton)
        .expect(indefSpan.hasChildElements).eql(true);
});

test("Click definite button", async t => {
    await t 
        .click(defButton)
        .expect(defSpan.hasChildElements).eql(true)
        .wait(1000)
        .expect(defSpan.hasChildElements).eql(false);
});

test("Click two buttons", async t => {
    await t 
        .click(defButton)
        .click(indefButton)
        .expect(defSpan.hasChildElements).eql(true);
});