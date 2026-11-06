const { calculateRiskRating } = require("../routes/api2");

describe("API 2: Driver Risk Rating", () => {
    //
    test("Returns an error for an empty string", () => {
        const result = calculateRiskRating("");

        expect(result).toEqual({
            error: "Claim history must contain text and cannot be empty.",
        });
    });

    test("Returns an error for an incorrect data type", () => {
        const result = calculateRiskRating(12345);

        expect(result).toEqual({
            error: "Claim history must contain text and cannot be empty.",
        });
    });

    test("Returns a risk rating of 2 for multiple keywords", () => {
        const result = calculateRiskRating(
            "I have had a crash and it scratched my car.",
        );

        expect(result).toBe(2);
    });

    test("Caps the risk rating at 5 when more than 5 keywords occur", () => {
        const result = calculateRiskRating(
            "crash bump smash collide scratch bump crash",
        );

        expect(result).toBe(5);
    });

    test("Recognises keywords regardless of capitalisation", () => {
        const result = calculateRiskRating("CRASH SCRATCH BUMP");

        expect(result).toBe(3);
    });

    test("Counts repeated keywords and keywords within longer words", () => {
        const result = calculateRiskRating(
            "My only claim was a crash into my house's garage door that left a scratch on my car. There are no other crashes.",
        );

        expect(result).toBe(3);
    });

    test("Returns the minimum risk rating of 1 when no keywords are present", () => {
        const result = calculateRiskRating("I have had seven accidents.");

        expect(result).toBe(1);
    });
});
