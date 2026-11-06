const express = require('express');
const router = express.Router();

function calculateCarValue(data) {

    // Check if the data is valid
    if (!data || typeof data !== "object" || Array.isArray(data)) {
        throw new Error("Invalid input");
    }

    const { model, year } = data;
    let modelValue = 0;
    const alphabet = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ]

    // Check if the model or year is empty
    if (!model || !year) {
        throw new Error("Input must not be empty");
    }

    // Check if the input is null
    if (typeof model !== "string" || typeof year !== "number") {
        throw new Error("Input types cannot be invalid");
    }

    // Check if the model contains at least one letter
    if (!/[a-z]/i.test(model)) {
        throw new Error("Model must contain at least one letter");
    }

    // Check if the year is a decimal, negative or greater than the current year
    if (year < 0 || year > new Date().getFullYear() || !Number.isInteger(year)) {
        throw new Error("Year cannot be invalid");
    }

    // Calculate the car value based on the model
    for (let letter of model.toLowerCase()) {
        const index = alphabet.indexOf(letter);
        if (index !== -1) { modelValue += index + 1; }
    }

    return modelValue * 100 + year;
}

router.post("/", (req, res) => {
    try {
        const result = calculateCarValue(req.body);
        res.status(200).json({ carValue: result });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = router;
module.exports.calculateCarValue = calculateCarValue;