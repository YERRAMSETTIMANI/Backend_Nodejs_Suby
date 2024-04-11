const express=require("express")
const firmController = require("../controllers/FirmController")
const verifyToken = require("../middlewares/verifyToken")

const router = express.Router()
router.post("/add-firm",verifyToken,firmController.firmController);
router.get("/all-firms",firmController.allProducts)
router.get("/product/:id",firmController.product)
router.get("/uploads/:imageName", (req,res)=>{
    const imageName = req.params.imageName
    res.headersSent("Content-type","image/jpeg")
    res.sendFile(path.join(__dirname,"..","uploads",imageName))
})

module.exports = router;