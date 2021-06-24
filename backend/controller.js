const { generatePassword } = require("./utils/password");
const { User } = require("./models/userModel");
const { generateAddress } = require("./utils/balanceUtils");
const { getBalance } = require("./utils/balanceUtils");
const { makeBet } = require("./utils/bettingUtils");

// creates new User with function generated password.
async function createUser(req, res) {
    // generating new random password.
    const password = generatePassword(8);

    // creating new account and getting the address and key.
    const { address, privateKey } = generateAddress();

    // getting balance for that account.
    const balance = await getBalance(address);

    // creating new user with above values.
    const user = new User({
        password,
        account_address: address,
        privateKey,
        balance,
    });

    try {
        const newUser = await user.save();
        res.status(201);
        res.json({
            userID: newUser._id,
            password: newUser.password,
            account_address: newUser.account_address,
            balance: newUser.balance,
        });
        // res.json(newUser);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
}

// function for making bet, this first validates if user exists and if balance is greater than bet amount and then calls the bet function.
async function betRequest(req, res) {
    const { lessThanAmount, userID, password, betAmount } = req.body;

    const user = await User.findById(userID);

    if (user.password === password) {
        if (user.balance >= betAmount) {
            const betResult = await makeBet(
                lessThanAmount,
                user,
                Date.now(),
                betAmount
            );
            res.status(200);
            res.json(betResult);
        } else {
            res.status(400);
            res.send("Insufficient account balance for making bet.");
        }
    } else {
        res.status(404);
        res.send("User not found.");
    }
}

// for authenticating user and logging in.
async function authUser(req, res) {
    const { userID, password } = req.body;
    const user = await User.findById(userID);

    if (user) {
        if (user.password === password) {
            res.status(200);
            res.json({
                userID: user._id,
                account_address: user.account_address,
                password: password,
                balance: user.balance,
                withdrawal: user.withdrawal_requests,
                betHistory: user.new_history,
                bet_proceeds: user.bet_proceeds,
            });
        } else {
            res.status(400);
            res.send("Invalid UserID and password.");
        }
    } else {
        res.status(404);
        res.send("User not found");
    }
}

// for making the withdrawal request.
async function withdrawRequest(req, res) {
    const { userID, withdrawAmount, password, withdrawAddress } = req.body;

    // initializing result object for sending as response to user.
    let resultObject = {};

    // withdrawal request object with withdrawal details.
    let withdrawalRequest = {
        userID,
        withdrawAmount,
        password,
        withdrawAddress,
    };

    // getting the user from db.
    const user = await User.findById(userID);

    if (user) {
        if (user.password === password) {
            // If withdrawal possible
            if (user.balance >= withdrawAmount) {
                // deducting withdrawn amount from balance.
                user.balance -=withdrawAmount;

                // adding the withdrawal request object to the withdrawal_requests array.
                user.withdrawal_requests.push(withdrawalRequest);

                // saving updated user.
                const updatedUser = await user.save();

                // appending values to result object.
                resultObject.transactionStatus = "Completed";
                resultObject.previousBalance = user.balance;
                resultObject.updatedBalance = updatedUser.balance;
                res.status(200);
                res.json(resultObject);
            }
            // If withdrawal not possible due to low account balance.
            else {
                // appending values to result object.
                resultObject.transactionStatus = "Failed";
                resultObject.previousBalance = user.balance;
                resultObject.updatedBalance = false;
                res.status(400);
                resultObject.error =
                    "Insufficient account balance for requested withdrawal.";
                res.json(resultObject);
            }
        } else {
            res.status(401);
            res.json({
                error: "Invalid password for userID.",
            });
        }
    } else {
        res.status(404);
        res.json({
            error: "No user found for given userID.",
        });
    }
}

module.exports = {
    createUser,
    betRequest,
    authUser,
    withdrawRequest,
};
