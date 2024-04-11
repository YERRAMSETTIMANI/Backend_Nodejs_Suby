const product=require("../models/product");
const multer = require("multer");
const firm = require("../models/firm")

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


const addProduct = async(req,res)=>{
    try{
        const {productName,price,category,bestseller,description} = req.body
        const image = req.file?req.file.filename : undefined
        const Firm = await firm.findById(req.params.id)
        if(!Firm){
           return res.status(400).json("Firm not found")
        }
        const newData = new product({
           productName,price,category,image,bestseller,description,firm : Firm._id 
        })
        const addedProduct = await newData.save();
        Firm.product.push(addedProduct)
        await Firm.save()
        res.status(200).json("product added successfully")
       }
       catch(error){
           return res.status(500).json("internal server error")
       }
   
}

module.exports = {addProduct : [upload.single("image"),addProduct]}