const express = require('express');
const router = express.Router();

function calculateCarValue(data) {
    const { model, year } = data;
    let carValue = 0;

    const letterValues = {"C": 3, "c": 3, "i": 9, "v": 22}

    for (let letter of model) {
        carValue += letterValues[letter];
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
        res.status(400).json({error: "Error calculating car value"});
    }
});

module.exports = router;
module.exports.calculateCarValue = calculateCarValue;