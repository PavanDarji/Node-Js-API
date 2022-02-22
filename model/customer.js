const mongoose = require("mongoose");
const CustomerSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    address:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    gender:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
})

const customer = new mongoose.model('customer',CustomerSchema);
module.exports = customer;


