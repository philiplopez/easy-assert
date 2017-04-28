export interface AssertionResult {
    label : string,
    passed : boolean,
    details : string
}

export interface Assertions {
    equals : (expectedValue) => AssertionResult,
    approxEquals: (expectedValue : number, tolerance : number) => AssertionResult,
    // deepEquals: (expectedValue) => AssertionResult
}

export interface AssertMethods {
    actual : (actualValue) => Assertions
}

function provideEquals(label : string, actualValue : any) {
    return (expectedValue) => {
        const passed = actualValue === expectedValue;
        const details = (passed)
            ? `equals ${expectedValue}`
            : `${actualValue} does not equal expected ${expectedValue}`;
        return {label, passed, details}
    }
}

function provideApproxEquals(label : string, actualValue : number) {
    return (expectedValue : number, tolerance : number) => {
        const passed = Math.abs(actualValue - expectedValue) <= tolerance;
        const details = (passed)
            ? `approximately equals ${expectedValue}`
            : `${actualValue} does not approximately equal expected ${expectedValue}`;
        return {label, passed, details}
    }
}

export function assert(label) : AssertMethods {
    return({
        actual: (actualValue) => ({
            equals: provideEquals(label, actualValue),
            approxEquals: provideApproxEquals(label, actualValue)
        })
    });
}

export function log(result : AssertionResult) {
    const {label, passed, details} = result;
    const flag = (passed)
        ? " ✓ "
        : " ✗ ";
    const message = ` ${flag} [${label}] ${details}`;
    console.log(message)
}

function doCheck(testLabel) {
    function outputResult(test, passDetails, failDetails) {
        const message = (test)
            ? ` ✓ [${testLabel}] ${passDetails}`
            : ` ✗ [${testLabel}] ${failDetails}`;
        console.log(message);
    }
    return ({
        actual: (actualValue) => ({
            equals: (expectedValue) => {
                outputResult(actualValue === expectedValue, `equals ${actualValue}`, `${actualValue} does not equal ${actualValue}`);
            },
            approxEquals: (expectedValue, tolerance) => {
                outputResult(Math.abs(actualValue - expectedValue) <= tolerance, `approximately equals ${actualValue}`, `${actualValue} does not approximately equal ${actualValue}`);
            }
        })
    });
}