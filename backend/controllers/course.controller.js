const asyncHandler = require("express-async-handler")
const Course = require("../models/course.model")
const User = require("../models/user.model")


const getUserCourse = asyncHandler( async(request, response) => {
    const courses = await Course.find()

    response.status(200).json({ courses })
})


const createCourse = asyncHandler( async(request, response) => {
    const { courseName } = request.body

    if(!courseName){
        response.status(400)
        throw new Error("Enter course name")
    }

    const newCourse = await Course.create({
        courseName
    })

    response.status(201).json({ newCourse })
})

const updateCourse = asyncHandler( async(request, response) => {
    const { id } = request.params

    const course = await Course.findById(id)
    if(!course){
        response.status(400)
        throw new Error("Course not found")
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, request.body, { new: true})
    response.status(200).json(updatedCourse)
})

const deleteCourse = asyncHandler( async(request, response) => {
    const { id } = request.params
    
    const course = await Course.findById(id)
    if(!course){
        response.status(400)
        throw new Error("Course not found")
    }

    await Course.findByIdAndDelete(id)
    response.status(200).json({message: `course of ${id} deleted`})
})

module.exports = {
    getUserCourse,
    createCourse,
    updateCourse,
    deleteCourse
}