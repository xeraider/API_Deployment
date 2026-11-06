const express = require("express");
const router = express.Router();

//CODE FOR THE API

router.post("/", (req, res) => {
    const { claim_history } = req.body;

    const result = calculateRiskRating(claim_history);

    if (typeof result === "object") {
        return res.status(400).json(result);
    }

    return res.status(200).json({
        risk_rating: result,
    });
});

//Makes the API code available to other js files
module.exports = router;
module.exports.calculateRiskRating = calculateRiskRating;

// --------------------------------------------------------------//

function calculateRiskRating(claimHistory) {
    if (typeof claimHistory !== "string" || claimHistory.trim() === "") {
        return {
            error: "Claim history must contain text and cannot be empty.",
        };
    }

    const keywords = ["collide", "crash", "scratch", "bump", "smash"];

    const text = claimHistory.toLowerCase();

    let riskRating = 0;

    for (const keyword of keywords) {
        const matches = text.split(keyword).length - 1;
        riskRating += matches;
    }

    return Math.max(1, Math.min(riskRating, 5));
}
