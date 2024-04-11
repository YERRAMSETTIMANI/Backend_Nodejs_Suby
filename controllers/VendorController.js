const Vendor = require("../models/vendor");
const bcrypt  =require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotEnv = require("dotenv")

dotEnv.config()

const vendorRegister = async (req,res)=>{
    const {username,email,password} = req.body
    try{
        const exist = await Vendor.findOne({email});
        if(exist){
            return res.status(400).json("Email already existed")
        }
        const hashPassword = await bcrypt.hash(password,10);
        const newData = new Vendor({ 
            username,
            email,password : hashPassword
        });
        await newData.save()
        res.status(200).json({message :"vendor registered successfully"})
        console.log("registered")
    }
    catch(error){
        return res.status(500).json({error:"internal server error"})
    }
}

const vendorLogin = async (req,res)=>{
    const {email,password} = req.body
    try{
        const exist = await Vendor.findOne({email});
        if(!exist  || !(await bcrypt.compare(password,exist.password))){
            return res.status(400).json({error:"Invalid username or password"})
        }
        const token = jwt.sign({vendorId : exist._id},process.env.SecretKey, {expiresIn:"1h"})
        res.status(200).json({message:"login successfully",token})
        console.log({email,token})
    }
    catch(error){
        return res.status(500).json({error:"internal server error"})
    }
}



module.exports = {vendorRegister, vendorLogin }