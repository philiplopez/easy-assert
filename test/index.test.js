import test from 'ava';
import * as C from '../lib';

test('assert equals expected', t => {
    const result = C.assert("label1").actual(5).equals(5);
    t.is(result.label, "label1");
    t.true(result.passed);
    t.is(result.details, "equals 5");
});

test('assert not equals expected', t => {
    const result = C.assert("label2").actual(5).equals(6);
    t.is(result.label, "label2");
    t.false(result.passed);
    t.is(result.details, "5 does not equal expected 6");
});

test('assert approx equals expected', t => {
    const result = C.assert("label1").actual(5.23).approxEquals(5.24, 0.1)
    t.is(result.label, "label1");
    t.true(result.passed);
    t.is(result.details, "approximately equals 5.24");
});

test('assert not approx equals expected', t => {
    const result = C.assert("label2").actual(5.23).approxEquals(5.24, 0.001)
    t.is(result.label, "label2");
    t.false(result.passed);
    t.is(result.details, "5.23 does not approximately equal expected 5.24");
});
