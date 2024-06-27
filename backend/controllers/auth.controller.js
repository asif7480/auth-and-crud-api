const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const User = require("../models/user.model")
const generateToken = require("../utils/generateToken")

const registerUser = asyncHandler( async(request, response) => {
    const { username, email, password } = request.body

    if(!username || !email || !password){
        throw new Error("Input all fields")
    }

    const exists = await User.findOne({ username })

    if(exists){
        response.status(400)
        throw new Error("User already registered")
    }

    const hashPassword = await bcrypt.hash(password, 10)
 
    const user = await User.create({
            username,
            email,
            password: hashPassword
        })

    response.status(201).json(user)
     
})

const loginUser = asyncHandler( async(request, response) => {
    const { email, password } = request.body

    if(!email || !password){
        response.status(400)
        throw new Error("Input all input fields")
    }
    
    const user = await User.findOne({ email })

    if(!user){
        response.status(400)
        throw new Error("User not registered")
    }

    const matchPassword = await bcrypt.compare(password, user.password)

    if(!matchPassword){
        throw new Error("Invalid password")
    }

    response.status(200).json({
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
    })
})

const profile = asyncHandler( async(request, response) => {
    response.status(200).json({
        message: "profile"
    })
})

module.exports = {
    registerUser,
    loginUser,
    profile
}