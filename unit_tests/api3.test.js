
const test = require("node:test");
const assert = require("node:assert/strict");
const { calculateQuote } = require("../routes/api3");

test("Correct insurance quote", () => {
  const result = calculateQuote({
    car_value: 6614,
    risk_rating: 5
  });

  assert.deepEqual(result, {
    monthly_premium: 27.5,
    yearly_premium: 330
  });
});

test("Minimum risk rating", () => {
  const result = calculateQuote({
    car_value: 2000,
    risk_rating: 1
  });

  assert.equal(result.yearly_premium, 20);
});

test("Risk rating too low", () => {
  assert.throws(() => calculateQuote({
    car_value: 6614,
    risk_rating: 0
  }));
});

test("Risk rating too high", () => {
  assert.throws(() => calculateQuote({
    car_value: 6614,
    risk_rating: 6
  }));
});

test("Negative car value", () => {
  assert.throws(() => calculateQuote({
    car_value: -100,
    risk_rating: 3
  }));
});

test("Missing car value", () => {
  assert.throws(() => calculateQuote({
    risk_rating: 3
  }));
});

test("Specific error for invalid car value", () => {
  assert.throws(
    () => calculateQuote({
      car_value: -100,
      risk_rating: 3
    }),
    /Invalid car_value: must be a positive number/
  );
});

test("Specific error for invalid risk rating", () => {
  assert.throws(
    () => calculateQuote({
      car_value: 6614,
      risk_rating: 6
    }),
    /Invalid risk_rating: must be an integer between 1 and 5/
  );
});

test("Specific error for invalid request body", () => {
  assert.throws(
    () => calculateQuote(null),
    /Request body must be a valid JSON object/
  );
});

