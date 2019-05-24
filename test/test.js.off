/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
var assert = require("chai").assert;
var expect = require("chai").expect;

var testFunction = function(lanAttr) {
    if (lanAttr === "en") {
        // phrase.textContent = "Hello world " //+ core_hello_tag.textContent;
        return "Hello World";
    } else if (lanAttr === "ko") {
    // phrase.textContent = "안녕하세요 " //+ core_hello_tag.textContent;
        return "안녕하세요";
    } else if (lanAttr === "ja") {
    // phrase.textContent = "こんにちは " //+ core_hello_tag.textContent;
        return "こんにちは";
    } else {
    // phrase.textContext = "Unknown Language!"; //It only supports three languages; English, Korean, Japanese
        return "Unknown Language";
    }
};

describe("Language Tests", function() {
    it("English Test", function() {
        assert.equal("Hello World", testFunction("en"));
    });
    it("Korean Test", function() {
        assert.equal("안녕하세요", testFunction("ko"));
    });
    it("Japanese Test", function() {
        assert.equal("こんにちは", testFunction("ja"));
    });
    it("English Test", function() {
        assert.equal("Unknown Language", testFunction(""));
    });
});
