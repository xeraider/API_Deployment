const express = require('express');
const router = express.Router();

function calculateCarValue(data) {
    const { model, year } = data;

    let carValue = 0;

    const alphabet = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ]

    if (!model || !year) {
        throw new Error("Input must not be empty");
    }

    if (typeof model !== "string" || typeof year !== "number") {
        throw new Error("Input types cannot be invalid");
    }

    if (year < 0 || year > new Date().getFullYear()) {
        throw new Error("Year cannot be invalid");
    }

    for (let letter of model.toLowerCase()) {
        carValue += alphabet.indexOf(letter) + 1;
    }

    carValue *= 100;
    carValue += year;

    return carValue;
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