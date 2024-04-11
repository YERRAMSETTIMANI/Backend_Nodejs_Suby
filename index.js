const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const vendorRoutes = require("./routes/vendorRoutes")
const bp = require("body-parser");
const firmRoutes =require("./routes/firmRoutes")
const productRoutes = require("./routes/productRoutes")
const path = require("path")
const app = express()

const PORT = process.env.PORT || 4000;

dotenv.config();

mongoose.connect(process.env.Mongo_URI).then(()=>{
    console.log("Db connected successfully")
}).catch(err =>{
    console.log(err)
})

app.use(bp.json())
app.use("/vendor",vendorRoutes);
app.use("/firm",firmRoutes)
app.use("/restaurant",productRoutes)
app.use("/uploads",express.static("uploads"))

app.listen(PORT, ()=>{
    console.log(`server started running at port ${PORT}`)
})

app.use("/",(req,res)=>{
    res.send("hello")
})