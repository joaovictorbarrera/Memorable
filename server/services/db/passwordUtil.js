const bcrypt = require("bcrypt")

async function encryptPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword
}

async function checkPassword(serverPassword, clientPassword) {
    console.log({serverPassword, clientPassword})
    return await bcrypt.compare(clientPassword, serverPassword)
}

module.exports = {encryptPassword, checkPassword}