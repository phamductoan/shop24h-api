const express = require("express");

const { printProductTypeMiddlware } = require("../middleware/ProductTypeMiddlware");
const {createProductType, getAllProductType, getProductTypeById, updateProductTypeById, deleteProductTypeById} = require("../controller/ProductTypeController");
const router = express.Router();

router.use(printProductTypeMiddlware);

router.get("/productTypes", printProductTypeMiddlware, getAllProductType);

router.post("/productTypes", printProductTypeMiddlware, createProductType);

router.get("/productTypes/:productTypeId", printProductTypeMiddlware, getProductTypeById);

router.put("/productTypes/:productTypeId", printProductTypeMiddlware, updateProductTypeById);

router.delete("/productTypes/:productTypeId", printProductTypeMiddlware, deleteProductTypeById);

// exports router
module.exports = router;