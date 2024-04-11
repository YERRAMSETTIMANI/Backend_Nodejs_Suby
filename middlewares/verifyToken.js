const jwt =require("jsonwebtoken")
const dotEnv=require("dotenv")
const Vendor = require("../models/vendor")

dotEnv.config()

const verifyToken = async(req,res,next)=>{
    const token = req.headers.token;
    if(!token){
        return res.status(400).json("token not found")
    }
    try {
        const decoded = jwt.verify(token,process.env.SecretKey)
        const vendor = await Vendor.findById(decoded.vendorId)
        if(!vendor){
            return res.status(400).json("Vendor not existed")
        }

        req.vendorId = vendor._id
        next()

    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}


module.exports = verifyToken