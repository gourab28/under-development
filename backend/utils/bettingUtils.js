var gen = require("random-seed");
const { updateBalance } = require("./balanceUtils");
const { seedOfTheDay } = require("./seed");

// generates a random 5 character string for using as the seed of the day.

// sigDigits function for use in multiplier.
function sigDigits(n, sig) {
    var mult;
    mult = Math.pow(10, sig - Math.floor(Math.log(n) / Math.LN10) - 1);
    return Math.floor(n * mult) / mult;
}

// function for rolling dice.
function rollDice(seedOfTheDay, userID, timeOfBet) {
    // getting the last 4 characters from userID.
    betUserID = userID.slice(userID.length - 4);
    // getting the time string in required format.
    var timeSeed = new Date(timeOfBet);

    // format options for formatting date to required format.
    let options = {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };
    timeSeed = timeSeed.toLocaleTimeString("en-us", options);

    // removing the ':' from the time.
    timeSeed = timeSeed.split(":").join("");

    var seed = seedOfTheDay + betUserID + timeSeed;

    // generating random value generator with seed value.
    var rand = new gen(seed);
    // generating diceValue.
    const diceValue = rand(65536);

    // defining resulting object for diceRoll.
    let rollResult = {
        diceValue,
        seed,
    };
    return rollResult;
}

// async function for making bet and saving resulting data to db.
async function makeBet(lessThanAmount, user, timeOfBet, betAmount) {
    // calling the roll dice function
    const { diceValue, seed } = rollDice(
        seedOfTheDay,
        `${user._id}`,
        timeOfBet
    );

    // Handling Edge cases.
    if (lessThanAmount < 1) {
        lessThanAmount = 1;
    } else if (lessThanAmount > 62500) {
        lessThanAmount = 60000;
    }
    // calculating the multiplier.
    let multiplier = sigDigits((65536 / lessThanAmount) * 0.98, 5);

    // if the rolled dice value is greater than the betNumber.
    if (diceValue < lessThanAmount) {
        // updating balance with new winnings.
        const updatedBalance = await updateBalance(
            true,
            user,
            multiplier,
            betAmount,
            timeOfBet,
            seed
        );
        updatedBalance.diceValue = diceValue;
        return updatedBalance;
    } else {
        // updating balance by deducting betAmount.
        const updatedBalance = await updateBalance(
            false,
            user,
            multiplier,
            betAmount,
            timeOfBet,
            seed
        );
        updatedBalance.diceValue = diceValue;
        return updatedBalance;
    }
}

module.exports = {
    rollDice,
    makeBet,
};
