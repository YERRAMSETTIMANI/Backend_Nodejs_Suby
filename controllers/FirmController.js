const firm = require("../models/firm")
const vendor = require("../models/vendor")
const multer = require("multer")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Uploads folder
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  // Initialize Multer upload
  const upload = multer({
    storage: storage
  });

const firmController = async(req,res)=>{
    try{
     const {firmName,address,category,region,offers} = req.body
     const image = req.file?req.file.filename : undefined
     const Vendor = await vendor.findById(req.vendorId)
     if(!Vendor){
        return res.status(400).json("Vendor not found")
     }
     const newData = new firm({
        firmName,address,category,region,offers,image,vendor : Vendor._id 
     })
     const addedfirm = await newData.save();
     Vendor.firm.push(addedfirm)
     await Vendor.save()
     res.status(200).json("Firm added successfully")
    }
    catch(error){
        return res.status(500).json("internal server error")
    }

}

const allProducts = async(req,res)=>{
  const products = await vendor.find().populate("firm")
  return res.json({products})
}

const product = async(req,res)=>{
  const singleProduct = await vendor.findById(req.params.id).populate("firm")
  return res.json(singleProduct)
}

module.exports = {firmController : [upload.single("image"),firmController],allProducts,product}