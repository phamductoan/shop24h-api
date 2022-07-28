const express = require("express");

const { printProductMiddlware } = require("../middleware/ProductMiddleware");
const {createProduct, getAllProduct, getProductById, updateProductById, deleteProductById, getAllProductLimit} = require("../controller/ProductController");
const router = express.Router();

router.use(printProductMiddlware);

router.get("/poducts", printProductMiddlware, getAllProduct);

router.post("/poducts", printProductMiddlware, createProduct);

router.get("/limit-products/:productId", printProductMiddlware, getProductById);

router.put("/limit-products/:productId", printProductMiddlware, updateProductById);

router.delete("/limit-products/:productId", printProductMiddlware, deleteProductById);

router.get("/limit-products",printProductMiddlware, getAllProductLimit);

// exports router
module.exports = router;