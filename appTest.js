"use strict";

// https://blog.logrocket.com/testing-node-js-mocha-chai/
// https://www.chaijs.com/guide/styles/
// https://mochajs.org/

const expect = require("chai").expect;

describe("Block 1 exemple", function () {
    context("Success", function () {
        it("should return true", function () {
            expect(true).to.equal(true);
        });
    });

    // context("Fail", function () {
    //     it("should return false", function () {
    //         expect(true).to.equal(false);
    //     });
    // });
});
