const express = require("express")
const router = express.Router()
const {
    registerUser,
    loginUser,
    profile
} = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile",authMiddleware ,profile)


module.exports = router