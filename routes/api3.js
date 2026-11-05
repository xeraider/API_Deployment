
const express = require("express");
const router = express.Router();

// Function to calculate insurance quote
function calculateQuote(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("there is an error");
  }

  const { car_value, risk_rating } = data;

  // Validate car value
  if (
    typeof car_value !== "number" ||
    !Number.isFinite(car_value) ||
    car_value <= 0
  ) {
    throw new Error("there is an error");
  }

  // Validate risk rating (1 to 5)
  if (
    !Number.isInteger(risk_rating) ||
    risk_rating < 1 ||
    risk_rating > 5
  ) {
    throw new Error("there is an error");
  }

  // Calculate insurance premium
  const yearly_premium = Math.trunc(
    (car_value * risk_rating) / 100
  );

  const monthly_premium = Number(
    (yearly_premium / 12).toFixed(2)
  );

  return {
    monthly_premium,
    yearly_premium
  };
}

// POST /api3
router.post("/", express.json(), (req, res) => {
  try {
    const quote = calculateQuote(req.body);
    res.status(200).json(quote);
  } catch (error) {
    res.status(400).json({
      error: "there is an error"
    });
  }
});

module.exports = router;
module.exports.calculateQuote = calculateQuote;
