const  mongoose  = require("mongoose");
const orderModel  = require("../model/OrderModel");
const customerModel   = require("../model/CustomerModel");

const createOrder = (request, response) => {
    let orderDate = request.body.orderDate;
    let shippedDate = request.body.shippedDate;
    let note = request.body.note;
    let orderDetail = request.body.orderDetail;
    let cost = request.body.cost;
    let timeCreated = request.body.timeCreated;
    let timeUpdated = request.body.timeUpdated;
    

    let customerId = request.params.customerId;

    if(!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            status: "Bad request",
            message: "Customer ID is not valid"
        })
    }

    orderModel.create({
        _id: mongoose.Types.ObjectId(),
        orderDate: orderDate,
        shippedDate: shippedDate,
        note: note,
        orderDetail: orderDetail,
        cost: cost,
        timeCreated: timeCreated,
        timeUpdated: timeUpdated
    }, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        } else {
            customerModel.findByIdAndUpdate(customerId, {
                $push: { orders:  data._id }
            }, (err, CustomersUpdated) => {
                if(err) {
                    return response.status(500).json({
                        status: "Internal server error",
                        message: err.message
                    })
                } else {
                    return response.status(201).json({
                        status: "Created",
                        data: data
                    })
                }
            })
        }
    })
}

const getAllOrder = (request, response) => {
    orderModel.find((error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success",
                data: data
            })
        }
    })
}

const getAllOrderOfCustomer = (request, response) => {
    let customerId = request.params.customerId;

    if(!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            status: "Bad request",
            message: "Customer Id is not valid"
        })
    }

    customerModel.findById(customerId)
        .populate("orders")
        .exec((error, data) => {
            if(error) {
                return response.status(500).json({
                    status: "Internal server error",
                    message: error.message
                })
            } else {
                return response.status(200).json({
                    status: "Success",
                    data: data.orders
                })
            }
        })
}

const getOrderById = (request, response) => {
    let orderId = request.params.orderId;

    if(!mongoose.Types.ObjectId.isValid(orderId)) {
        return response.status(400).json({
            status: "Bad request",
            message: "Order Id is not valid"
        })
    }

    orderModel.findById(orderId, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        } else {
            if(data) {
                return response.status(200).json({
                    status: "Success",
                    data: data
                })
            } else {
                return response.status(404).json({
                    status: "Not found"
                })
            }
           
        }
    })
}

const updateOrderById = (request, response) => {
    let orderDate = request.body.orderDate;
    let shippedDate = request.body.shippedDate;
    let note = request.body.note;
    let orderDetail = request.body.orderDetail;
    let cost = request.body.cost;
    let timeCreated = request.body.timeCreated;
    let timeUpdated = request.body.timeUpdated;
    

    let orderId = request.params.orderId;

    if(!mongoose.Types.ObjectId.isValid(orderId)) {
        return response.status(400).json({
            status: "Bad request",
            message: "Order Id is not valid"
        })
    }

    orderModel.findByIdAndUpdate(orderId, {
        orderDate: orderDate,
        shippedDate: shippedDate,
        note: note,
        orderDetail: orderDetail,
        cost: cost,
        timeCreated: timeCreated,
        timeUpdated: timeUpdated
    }, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        } else {
            if(data) {
                return response.status(200).json({
                    status: "Success",
                    data: data
                })
            } else {
                return response.status(404).json({
                    status: "Not found"
                })
            }
        }
    })
}

const deleteOrderById = (request, response) => {
    let orderId = request.params.orderId;
    let customerId = request.params.customerId;

    if(!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            status: "Bad request",
            message: "Customer Id is not valid"
        })
    }

    if(!mongoose.Types.ObjectId.isValid(orderId)) {
        return response.status(400).json({
            status: "Bad request",
            message: "Order Id is not valid"
        })
    }

    orderModel.findByIdAndDelete(orderId, (error) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        } else {
            customerModel.findByIdAndUpdate(customerId, {
                $pull: { orders: orderId }
            }, (err) => {
                if(err) {
                    return response.status(500).json({
                        status: "Internal server error",
                        message: err.message
                    })
                } else {
                    return response.status(204).json()
                }
            })
        }
    })
}

module.exports = {
    createOrder,
    getAllOrder,
    getAllOrderOfCustomer,
    getOrderById,
    updateOrderById,
    deleteOrderById
}
