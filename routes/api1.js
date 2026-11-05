const express = require('express');
const router = express.Router();

function calculateCarValue(data) {
    return {car_value: "This is the first implementation"}
}

router.post("/", (req, res) => {
    try {
        const result = calculateCarValue(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: "Error calculating car value"});
    }
});

module.exports = router;
module.exports.calculateCarValue = calculateCarValue;