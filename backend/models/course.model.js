const mongoose = require("mongoose")

const courseSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        courseName: {
            type: String,
            required: true,
        }
    }, 
    { timestamps: true }
)

const Course = mongoose.model("Course", courseSchema)
module.exports = Course