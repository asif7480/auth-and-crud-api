const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
const asyncHandler = require("express-async-handler")

const authMiddleware =asyncHandler(async(request, response, next) => {
    let token;

    if(request.headers.authorization && request.headers.authorization.startsWith("Bearer")){
        try{
            token = request.headers.authorization.split(" ")[1]

            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            console.log(decoded);
    
            request.user = await User.findById(decoded.id).select("-password")
            console.log(request.user);
            next()
        }catch(error){
            response.status(401)
            throw new Error(error)
        }
    }

    if(!token){
        response.status(401)
        throw new Error("Invalid Token")
    }
})

module.exports = authMiddleware