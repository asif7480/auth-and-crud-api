const express = require("express")
const connectDB = require("./config/db")
const errorHandler = require("./middlewares/error.middleware")
const dotenv = require("dotenv").config()

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()

app.use("/api/users/", require("./routes/auth.route"))
app.use("/api/courses/", require("./routes/course.route"))

app.use(errorHandler)
app.listen(port, () => console.log(`Server is running at port : ${port}`))