const  mongoose  = require("mongoose");
const productModel  = require("../model/ProductModel");

const createProduct  = (request, response) => {
    let _id = mongoose.Types.ObjectId();
    let name = request.body.name;
    let description = request.body.description;
    let type = request.body.type;
    let imageUrl = request.body.imageUrl;
    let buyPrice = request.body.buyPrice;
    let promotionPrice = request.body.promotionPrice;
    let amount = request.body.amount;

    if (!name) {
        return response.status(400).json({
            status: "Bad request",
            message: "Name is required"
        })
    }
    if (!type) {
        return response.status(400).json({
            status: "Bad request",
            message: "type is required"
        })
    }
    if(!mongoose.Types.ObjectId.isValid(type)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "type ID is invalid"
        })
    }
    if (!imageUrl) {
        return response.status(400).json({
            status: "Bad request",
            message: "imageUrl is required"
        })
    }
    if (!buyPrice) {
        return response.status(400).json({
            status: "Bad request",
            message: "buyPrice is required"
        })
    }
    if(!(Number.isInteger(buyPrice))) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "buyPrice is not valid"
        })
    }
    if (!promotionPrice) {
        return response.status(400).json({
            status: "Bad request",
            message: "promotionPrice is required"
        })
    }
    if(!(Number.isInteger(promotionPrice))) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "promotionPrice is not valid"
        })
    }
    if(!(Number.isInteger(amount))) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "amount is not valid"
        })
    }

    productModel.create({
        _id, name, description, type, imageUrl, buyPrice, promotionPrice, amount
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
const getAllProduct  = (request, response) => {
    productModel.find((error, data) => {
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


const getProductById  = (request, response) => {
    let productId = request.params.productId;

    if(!mongoose.Types.ObjectId.isValid(productId)) {
        return response.status(400).json({
            status: "Bad request",
            message: "productId is not valid"
        })
    }

    productModel.findById(productId, (error, data) => {
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

const updateProductById  = (request, response) => {
    let productId = request.params.productId;

    if(!mongoose.Types.ObjectId.isValid(productId)) {
        return response.status(400).json({
            status: "Bad request",
            message: "productId is not valid"
        })
    }

    let {  name, description, type, imageUrl, buyPrice, promotionPrice, amount } = request.body;

    productModel.findByIdAndUpdate(productId, {
        name: name,
        description: description,
        type: type,
        imageUrl: imageUrl,
        buyPrice: buyPrice,
        promotionPrice: promotionPrice,
        amount: amount,
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

const deleteProductById  = (request, response) => {
    let productId = request.params.productId;

    if(!mongoose.Types.ObjectId.isValid(productId)) {
        return response.status(400).json({
            status: "Bad request",
            message: "productId is not valid"
        })
    }

    productModel.findByIdAndDelete(productId, (error) => {
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

const getAllProductLimit = (request, response) => {
    const {
        name,
        type,
        minPromotionPrice,
        maxPromotionPrice,
        page,
        limit
      } = request.query;
    
      const condition = {};
    
      if (name) {
        const regex = new RegExp(`${name}`);
        condition.name = regex;
      }
    
      if (type && type !== "Tất cả") {
        condition.type = type;
      }
    
      if (minPromotionPrice) {
        condition.promotionPrice = {
          ...condition.promotionPrice,
          $gte: minPromotionPrice,
        };
      }
    
      if (maxPromotionPrice) {
        condition.promotionPrice = {
          ...condition.promotionPrice,
          $lte: maxPromotionPrice,
        };
      }
    if (limit){
        productModel.find(condition, (error, data) => {
            if (error) {
              return response.status(500).json({
                status: "Internal server error",
                message: error.message,
              });
            } else {
              return response.status(200).json({
                status: "Success",
                data: data,
              });
            }
          })
        .skip((page - 1) * limit)
        .limit(limit);
    }  else {
        productModel.find((error, data) => {
            if(error) {
                response.status(500).json({
                    status: "Error 500: Internal server error",
                    message: error.message
                })
            } else {
                response.status(200).json({
                    status: "Success: Get Users success",
                    data: data
                })
            }
        })
    }
    
}
module.exports = {createProduct, getAllProduct, getProductById, updateProductById, deleteProductById, getAllProductLimit  }