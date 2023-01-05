"use strict";

const errorTxt = require("../../txtContent/en/contentTxt.json").random;
const isNumberRegex = new RegExp("^[0-9]{1,10}$");

const randomValidators = {
    minIsValid(min) {
        if (!isNumberRegex.test(min)) {
            return errorTxt.errorMsg.minMaxInvalid;
        }
    },
    maxIsValid(max) {
        if (!isNumberRegex.test(max)) {
            return errorTxt.errorMsg.minMaxInvalid;
        }
    },
    minIsLowerThanMax(min, max) {
        if (min >= max) {
            return errorTxt.errorMsg.minLessThanMax;
        }
    },
};

module.exports = randomValidators;
