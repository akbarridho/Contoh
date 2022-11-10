const express = require("express")
const router = express.Router()
const Controller = require("../controller/userController")

//findall startup
router.get("/", Controller)
module.exports = router