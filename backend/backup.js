// In Node.js use:

const Web3 = require("web3");

// binance rPC layer node for listening
let bsc = "https://bsc-dataseed.binance.org/";
// #the web3 variable is now connected to Binance Smart Chain
var web3 = new Web3(new Web3.providers.HttpProvider(bsc));
// #status of connection. a true statement means proper connection

const { abi } = require("./abi");

const contract_address = "0x0E3EAF83Ea93Abe756690C62c72284943b96a6Bc";

// for generating new Address.
function generateAddress() {
    var generate_address = web3.eth.accounts.create();
    return generate_address;
}

let contract = new web3.eth.Contract(abi, contract_address);

// function for getting balance for address.
async function getBalance(depositAddress) {
    const balance = await contract.methods.balanceOf(depositAddress).call();
    return web3.utils.fromWei(balance, "shannon");
}

// function for updating balance after bet result.
async function updateBalance(
    status,
    user,
    multiplier,
    betAmount,
    timeOfBet,
    seed
) {
    let depositBalance = await getBalance(user.account_address);

    let balance = parseFloat(depositBalance) + user.bet_proceeds;

    // result object for sending to user.
    let result = {
        diceValue: null,
        multiplier: multiplier,
        betAmount: betAmount,
        status: status,
        winnings: null,
        previousBalance: balance,
        updatedBalance: null,
        error: null,
    };

    // format options for formatting date to required format.
    let options = {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };

    // creating the betDetails String to add to the bet History object.
    let betDetailsString =
        user._id +
        "-" +
        `${new Date(timeOfBet).toLocaleTimeString("en-us", options)}` +
        "-" +
        seed +
        "-" +
        (status === true ? "Win" : "Loss");
       //This Additional Code Add By Gourab Start Here
   let betId = user.id;
   let betTime = `${new Date(timeOfBet).toLocaleTimeString("en-us", options)}`;
   let betLucky = status;
   //let betTerget = lessThanAmount;
   let betAmt = betAmount;
   let multi = multiplier;
   let prof = result.winnings;
   //This Additional Code Add By Gourab end Here
    // if they lose.
    if (status === false) {
        balance = balance - betAmount;
        user.bet_proceeds -= betAmount;
        user.balance = balance;
        //user.bet_history.push(betDetailsString);
        user.new_history.push({"betID": betId, "betTime": betTime, "betLucky": betLucky, "betAmount": betAmt, "multiplier": multi, "profit": prof});
        try {
            const updatedUser = await user.save();
            result.updatedBalance = updatedUser.balance;
        } catch (error) {
            result.error = error;
        }

        // if they win.
    } else {
        // deducting the 5% for the house fees.
        let winnings = betAmount * multiplier * 0.95 - betAmount;
        user.bet_proceeds += winnings;
        balance = balance + winnings;
        user.balance = balance;
        //user.bet_history.push(betDetailsString);
        user.new_history.push({"betID": betId, "betTime": betTime, "betLucky": betLucky, "betAmount": betAmt, "multiplier": multi, "profit": prof});
        try {
            const updatedUser = await user.save();
            result.updatedBalance = updatedUser.balance;
            result.winnings = winnings;
        } catch (error) {
            result.error = error;
        }
    }

    return result;
}

module.exports = {
    getBalance,
    generateAddress,
    updateBalance,
};

// setInterval(
//     () =>
//         contract.methods.balanceOf(deposit_address).call((error, result) => {
//             console.log(web3.utils.fromWei(result, "shannon"));
//         }),
//     5000
// );
