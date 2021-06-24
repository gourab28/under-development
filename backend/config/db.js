const mongoose = require("mongoose");

const MONGO_URI =
    "mongodb+srv://dev:smart5023@cluster0.wkqd8.mongodb.net/hodldice";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = {
    connectDB,
};
