const express = require("express");
const {
    createUser,
    betRequest,
    authUser,
    withdrawRequest,
} = require("./controller");

// creating a router for the server.
const appRouter = express.Router();

// create new User route.
appRouter.route("/").get(createUser);
appRouter.route("/login").post(authUser);
appRouter.route("/makeBet").post(betRequest);
appRouter.route("/withdraw").post(withdrawRequest);

module.exports = {
    appRouter,
};
