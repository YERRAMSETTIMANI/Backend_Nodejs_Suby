const express=require("express")
const productController = require("../controllers/ProductController")

const router = express.Router()
router.post("/:id/products",productController.addProduct);

router.get("/uploads/:imageName", (req,res)=>{
    const imageName = req.params.imageName
    res.headersSent("Content-type","image/jpeg")
    res.sendFile(path.join(__dirname,"..","uploads",imageName))
})

module.exports = router;