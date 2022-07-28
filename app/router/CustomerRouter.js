const express = require("express");

const { printCustomerMiddleware } = require("../middleware/CustomerMiddleware");
const {createCustomer, getAllCustomer, getCustomerById, updateCustomerById, deleteCustomerById} = require("../controller/CustomerController");
const router = express.Router();

router.use(printCustomerMiddleware);

router.get("/customers", printCustomerMiddleware, getAllCustomer);

router.post("/customers", printCustomerMiddleware, createCustomer);

router.get("/customers/:customerId", printCustomerMiddleware, getCustomerById);

router.put("/customers/:customerId", printCustomerMiddleware, updateCustomerById);

router.delete("/customers/:customerId", printCustomerMiddleware, deleteCustomerById);

// exports router
module.exports = router;