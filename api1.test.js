const test = require("node:test");
const assert = require("node:assert/strict");
const { calculateCarValue } = require("./routes/api1");

// Test 1: Start case
test("Handles base case correctly", () => {
    assert.deepStrictEqual(
        calculateCarValue({
            model: "Civic",
            year: 2014
        }),
        6614
    );
});

// Test 2: Simple case model
test("Handles lowercase model", () => {
    assert.deepStrictEqual(
        calculateCarValue({
            model: "civic",
            year: 2014
        }),
        6614
    );
});

// Test 3: Uppercase model
test("Handles uppercase model", () => {
    assert.deepStrictEqual(
        calculateCarValue({
            model: "CIVIC",
            year: 2014
        }),
        6614
    );
});

// Test 4: Single lower bound model
test("Calculates first alphabet letter A", () => {
    assert.deepStrictEqual(
        calculateCarValue({
            model: "A",
            year: 2020
        }),
        2120
    );
});

// Test 5: Single upper bound model
test("Calculates last alphabet letter Z", () => {
    assert.deepStrictEqual(
        calculateCarValue({
            model: "Z",
            year: 2020
        }),
        4620
    );
});

// Test 6: Ignore spaces
test("Ignores spaces in model", () => {
    assert.deepStrictEqual(
        calculateCarValue({
            model: "A B C",
            year: 2020
        }),
        2620
    );
});

// Test 7: Ignore dashes
test("Ignores dashes in model", () => {
    assert.deepStrictEqual(
        calculateCarValue({
            model: "A-B-C",
            year: 2020
        }),
        2620
    );
});

// Test 8: Ignore digits
test("Ignores digits in model", () => {
    assert.deepStrictEqual(
        calculateCarValue({
            model: "A12BC",
            year: 2020
        }),
        2620
    );
});

// Test 9: Empty input
test("Rejects empty input", () => {
    assert.throws(
        () => calculateCarValue({}),
        { message: "Input must not be empty" }
    );
});

// Test 10: Null model
test("Rejects null model", () => {
    assert.throws(
        () => calculateCarValue({
            model: null,
            year: 2020 }),
        { message: "Input must not be empty" }
    );
});

// Test 11: Null year
test("Rejects null year", () => {
    assert.throws(
        () => calculateCarValue({
            model: "Civic",
            year: null }),
        { message: "Input must not be empty" }
    );
});

// Test 12: Wrong input types
test("Rejects incorrect input types", () => {
    assert.throws(
        () => calculateCarValue({
            model: true,
            year: "2020" }),
        { message: "Input types cannot be invalid" }
    );
});

// Test 13: Negative year
test("Rejects negative year", () => {
    assert.throws(
        () => calculateCarValue({
            model: "Civic",
            year: -1
        }),
        { message: "Year cannot be invalid" }
    );
});

// Test 14: Future year
test("Rejects year above current year", () => {
    assert.throws(
        () => calculateCarValue({
            model: "Civic",
            year: 2028 }),
        { message: "Year cannot be invalid" }
    );
});

// Test 14: Future year
test("Rejects models with no letters", () => {
    assert.throws(
        () => calculateCarValue({
            model: "123",
            year: 2028 }),
        { message: "Model must contain at least one letter" }
    );
});