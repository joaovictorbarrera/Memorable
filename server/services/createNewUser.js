
// TODO:
module.exports = function createNewUser(user) {
    const validationResult = validateNewUser(user)
    if (!validationResult.success) return validationResult

    const dbResult = registerNewUser(user)
    if (!dbResult.sucess) return dbResult
}