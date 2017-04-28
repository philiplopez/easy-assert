"use strict";
exports.__esModule = true;
function provideEquals(label, actualValue) {
    return function (expectedValue) {
        var passed = actualValue === expectedValue;
        var details = (passed)
            ? "equals " + expectedValue
            : actualValue + " does not equal expected " + expectedValue;
        return { label: label, passed: passed, details: details };
    };
}
function provideApproxEquals(label, actualValue) {
    return function (expectedValue, tolerance) {
        var passed = Math.abs(actualValue - expectedValue) <= tolerance;
        var details = (passed)
            ? "approximately equals " + expectedValue
            : actualValue + " does not approximately equal expected " + expectedValue;
        return { label: label, passed: passed, details: details };
    };
}
function assert(label) {
    return ({
        actual: function (actualValue) { return ({
            equals: provideEquals(label, actualValue),
            approxEquals: provideApproxEquals(label, actualValue)
        }); }
    });
}
exports.assert = assert;
function log(result) {
    var label = result.label, passed = result.passed, details = result.details;
    var flag = (passed)
        ? " ✓ "
        : " ✗ ";
    var message = " " + flag + " [" + label + "] " + details;
    console.log(message);
}
exports.log = log;
function doCheck(testLabel) {
    function outputResult(test, passDetails, failDetails) {
        var message = (test)
            ? " \u2713 [" + testLabel + "] " + passDetails
            : " \u2717 [" + testLabel + "] " + failDetails;
        console.log(message);
    }
    return ({
        actual: function (actualValue) { return ({
            equals: function (expectedValue) {
                outputResult(actualValue === expectedValue, "equals " + actualValue, actualValue + " does not equal " + actualValue);
            },
            approxEquals: function (expectedValue, tolerance) {
                outputResult(Math.abs(actualValue - expectedValue) <= tolerance, "approximately equals " + actualValue, actualValue + " does not approximately equal " + actualValue);
            }
        }); }
    });
}
