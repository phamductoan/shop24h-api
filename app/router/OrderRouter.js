const express = require("express");

const { printOrderMiddleware } = require("../middleware/OrderMiddleware");
const {createOrder,getAllOrder,getAllOrderOfCustomer,getOrderById,updateOrderById,deleteOrderById} = require("../controller/orderController");
const router = express.Router();

router.use(printOrderMiddleware);
router.get("/orders", printOrderMiddleware, getAllOrder);

router.post("/customers/:customerId/orders", printOrderMiddleware, createOrder);

router.get("/customers/:customerId/orders", printOrderMiddleware, getAllOrderOfCustomer);

router.get("/orders/:orderId", printOrderMiddleware, getOrderById);

router.put("/orders/:orderId", printOrderMiddleware, updateOrderById);

router.delete("/customers/:customerId/orders/:orderId", printOrderMiddleware, deleteOrderById);


// exports router
module.exports = router;