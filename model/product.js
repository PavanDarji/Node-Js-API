const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true,

    }
})

const Product = new mongoose.model('product', ProductSchema);
module.exports = Product;


