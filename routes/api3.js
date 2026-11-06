
const express = require("express");
const router = express.Router();

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// Function to calculate insurance quote
function calculateQuote(data) {

  // Check request body
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new ValidationError(
      "Request body must be a valid JSON object."
    );
  }

  const { car_value, risk_rating } = data;

  // Validate car value
  if (
    typeof car_value !== "number" ||
    !Number.isFinite(car_value) ||
    car_value <= 0
  ) {
    throw new ValidationError(
      "Invalid car_value: must be a positive number."
    );
  }

  // Validate risk rating
  if (
    !Number.isInteger(risk_rating) ||
    risk_rating < 1 ||
    risk_rating > 5
  ) {
    throw new ValidationError(
      "Invalid risk_rating: must be an integer between 1 and 5."
    );
  }

  // Calculate insurance premium
  // Follows assignment example; rounding rule needs confirmation
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
    if (error instanceof ValidationError) {
      return res.status(400).json({
        error: error.message
      });
    }

    console.error("API 3 error:", error);
    return res.status(500).json({
      error: "Internal server error"
    });
  }
});

module.exports = router;
module.exports.calculateQuote = calculateQuote;


