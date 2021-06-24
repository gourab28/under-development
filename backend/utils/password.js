// util function for generating random password.
function generatePassword(length) {
    (charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"),
        (password = "");
    for (var i = 0, n = charset.length; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
}

module.exports = {
    generatePassword,
};
