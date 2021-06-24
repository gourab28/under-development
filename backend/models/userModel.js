const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    password: {
        type: String,
        required: [true, "password is a required field."],
    },
    account_address: {
        type: String,
        default: "",
    },
    privateKey: {
        type: String,
        default: "",
    },
    balance: {
        type: Number,
        default: 0,
    },
    bet_history: [{ type: String }],
    bet_proceeds: {
        type: Number,
        default: 0,
    },
    withdrawal_requests: [],
    bet_history: {
        type: Array,
        default: "",
    },
    new_history: {

        type: Array,
    },
});

// compares the entered and saved privateKeys
// userSchema.methods.matchPrivateKey = async function (enteredPrivateKey) {
//     return await bcrypt.compare(entered, this.privateKey);
// };

// // encrypts privateKey before saving to db
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) {
//         next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });

const User = mongoose.model("User", userSchema);

module.exports = {
    User,
};
