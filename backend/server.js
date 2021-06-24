const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connectDB } = require("./config/db");
const { appRouter } = require("./routes");

// connecting to mongodb database.
connectDB();

// initializing express app.
const app = express();

// enabling CORS.
app.use(cors());

// using the built in json parson for express.
app.use(express.json());

// logging requests to server for development.
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("Crypto Bot API is running.");
});

// connecting to the appRouter.
app.use("/api", appRouter);

// setting default port.
const PORT = process.env.PORT || 5000;

// making server listen on port.
app.listen(PORT, console.log("Server listening on port: ", PORT));
