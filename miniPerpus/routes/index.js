const express = require("express")
const router = express.Router()
const userRouter = require("./userRouter")
const bookRouter = require("./bookRouter")
const profileRouter = require("./profileRouter")

// router.get("/", (req, res) => {
//     res.redirect("/incubators")
// })

router.use("/user", userRouter)
router.use("/book", bookRouter)
router.use("/profile", profileRouter)

module.exports = router