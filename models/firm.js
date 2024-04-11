const mongoose = require("mongoose")

const firmSchema = new mongoose.Schema({
    firmName:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    category:{
        type:[
            {
                type:String,
                enum:["veg","non-veg"]
            }
        ]
    },
    region:{
        type:[
            {
                type:String,
                enum:["south-indian","north-indian","backery"]
            }
        ]
    },
    offers:{
        type:String
    },
    image:{
        type:String,
        // required:true
    },
    vendor:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"vendor"
    }
],
product:[
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:"product"
}
],
});

const firm = mongoose.model("firm",firmSchema)

module.exports=firm;