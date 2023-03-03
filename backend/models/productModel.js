const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Product Name is required"]
    },
    image:{
        type:String,
        required:[true,"image is required"]
    },
    public_image_id:{
        type:String,
        required:[true,"public_image_id is required"]
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        required:[true,"Price is required"]
    },
    discount:{
        type:Number,
        default:0
    },
    category:{
        type:String
    },
    rating:{
        type:Number,
        default:0
    }
    
})

module.exports = mongoose.model("Product",productSchema)