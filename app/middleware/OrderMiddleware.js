const printOrderMiddleware = (request, response, next) => {
    console.log("Request Order Url", request.url)

    next()
}
module.exports = { printOrderMiddleware }