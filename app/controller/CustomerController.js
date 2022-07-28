const  mongoose  = require("mongoose");
const customerModel  = require("../model/CustomerModel");

const createCustomer  = (request, response) => {
    let _id = mongoose.Types.ObjectId();
    let fullName = request.body.fullName;
    let phone = request.body.phone;
    let email = request.body.email;
    let address = request.body.address;
    let city = request.body.city;
    let country = request.body.country;
    let orders = request.body.orders;

    if (!fullName) {
        return response.status(400).json({
            status: "Bad request",
            message: "fullName is required"
        })
    }
    if (!phone) {
        return response.status(400).json({
            status: "Bad request",
            message: "phone is required"
        })
    }
    if (!email) {
        return response.status(400).json({
            status: "Bad request",
            message: "email is required"
        })
    }
    if(!mongoose.Types.ObjectId.isValid(orders)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "orders ID is invalid"
        })
    }
    customerModel.create({
        _id, fullName, phone, email, address, city, country, orders, timeCreated, timeUpdated
    }, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        } else {
            return response.status(201).json({
                status: "Created",
                data: data
            })
        }
    })
}
const getAllCustomer  = (request, response) => {
    customerModel.find((error, data) => {
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


const getCustomerById  = (request, response) => {
    let customerId = request.params.customerId;

    if(!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            status: "Bad request",
            message: "customerId is not valid"
        })
    }

    customerModel.findById(customerId, (error, data) => {
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

const updateCustomerById  = (request, response) => {
    let customerId = request.params.customerId;

    if(!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            status: "Bad request",
            message: "customerId is not valid"
        })
    }

    let {  fullName, phone, email, address, city, country, orders } = request.body;

    customerModel.findByIdAndUpdate(customerId, {
        fullName: fullName,
        phone: phone,
        email: email,
        address: address,
        city: city,
        country: country,
        orders: orders,
    }, (error, data) => {
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

const deleteCustomerById  = (request, response) => {
    let customerId = request.params.customerId;

    if(!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            status: "Bad request",
            message: "customerId is not valid"
        })
    }

    customerModel.findByIdAndDelete(customerId, (error) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        } else {
            return response.status(204).send()
        }
    })
}

module.exports = {createCustomer, getAllCustomer, getCustomerById, updateCustomerById, deleteCustomerById  }