const printCustomerMiddleware = (request, response, next) => {
    console.log("Request CustomerType Url", request.url)

    next()
}
module.exports = { printCustomerMiddleware }