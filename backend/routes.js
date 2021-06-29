const express = require("express");
const {
    createUser,
    betRequest,
    authUser,
    withdrawRequest,
    authBal,
    verifyBet,
    getStats,
} = require("./controller");

// creating a router for the server.
const appRouter = express.Router();

// create new User route.
appRouter.route("/").get(createUser);
appRouter.route("/stats").get(getStats);
appRouter.route("/login").post(authUser);
appRouter.route("/chkBal").post(authBal);
appRouter.route("/verifyBet").post(verifyBet);
appRouter.route("/makeBet").post(betRequest);
appRouter.route("/withdraw").post(withdrawRequest);

module.exports = {
    appRouter,
};
