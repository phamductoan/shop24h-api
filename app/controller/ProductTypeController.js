const  mongoose  = require("mongoose");
const productTypeModel  = require("../model/ProductTypeModel");

const createProductType  = (request, response) => {
    let _id = mongoose.Types.ObjectId();
    let name = request.body.name;
    let description = request.body.description;
    if (!name) {
        return response.status(400).json({
            status: "Bad request",
            message: "Name is required"
        })
    }

    productTypeModel.create({
        _id, name, description
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
const getAllProductType  = (request, response) => {
    productTypeModel.find((error, data) => {
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


const getProductTypeById  = (request, response) => {
    let productTypeId = request.params.productTypeId;

    if(!mongoose.Types.ObjectId.isValid(productTypeId)) {
        return response.status(400).json({
            status: "Bad request",
            message: "productTypeId is not valid"
        })
    }

    productTypeModel.findById(productTypeId, (error, data) => {
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

const updateProductTypeById  = (request, response) => {
    let productTypeId = request.params.productTypeId;

    if(!mongoose.Types.ObjectId.isValid(productTypeId)) {
        return response.status(400).json({
            status: "Bad request",
            message: "productTypeId is not valid"
        })
    }

    let {  name, description } = request.body;

    productTypeModel.findByIdAndUpdate(productTypeId, {
        name: name,
        description: description,
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

const deleteProductTypeById  = (request, response) => {
    let productTypeId = request.params.productTypeId;

    if(!mongoose.Types.ObjectId.isValid(productTypeId)) {
        return response.status(400).json({
            status: "Bad request",
            message: "productTypeId is not valid"
        })
    }

    productTypeModel.findByIdAndDelete(productTypeId, (error) => {
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

module.exports = {createProductType, getAllProductType, getProductTypeById, updateProductTypeById, deleteProductTypeById  }