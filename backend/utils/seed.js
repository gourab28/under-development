const { generatePassword } = require("./password");

// initializing the seedOfTheDay manually for the first time.
let seedOfTheDay = "xcvg2";

// will update the seedOfTheDay automatically after every 24hrs.
setInterval(() => {
    seedOfTheDay = generatePassword(5);
}, 1000 * 60 * 60 * 24);

module.exports = {
    seedOfTheDay,
};
