export interface AssertionResult {
    label: string;
    passed: boolean;
    details: string;
}
export interface Assertions {
    equals: (expectedValue) => AssertionResult;
    approxEquals: (expectedValue: number, tolerance: number) => AssertionResult;
}
export interface AssertMethods {
    actual: (actualValue) => Assertions;
}
export declare function assert(label: any): AssertMethods;
export declare function log(result: AssertionResult): void;
