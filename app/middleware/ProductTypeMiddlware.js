const printProductTypeMiddlware = (request, response, next) => {
    console.log("Request ProductType Url", request.url)

    next()
}
module.exports = { printProductTypeMiddlware }