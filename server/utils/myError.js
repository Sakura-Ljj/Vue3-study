module.exports = function myError (errCode, errMessage) {
    return { code: errCode, message: errMessage }
}
