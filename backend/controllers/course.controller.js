const asyncHandler = require("express-async-handler")
const Course = require("../models/course.model")
const User = require("../models/user.model")

//@desc Get all courses of all users
//@route GET /api/courses
//@access public
const getAllCourses = asyncHandler( async(request, response) => {
    const courses = await Course.find()

    response.status(200).json({ courses })
})

//@desc Get all course of authorized user
//@route GET /api/courses
//@access private
const getUserCourses = asyncHandler( async(request, response) => {
    const courses = await Course.find({ user: request.user._id})

    response.status(200).json({ courses })
})

//@desc create course of authorized user
//@route POST /api/courses
//@access private
const createCourse = asyncHandler( async(request, response) => {
    const { courseName } = request.body

    if(!courseName){
        response.status(400)
        throw new Error("Enter course name")
    }

    const newCourse = await Course.create({
        courseName,
        user: request.user._id
    })

    response.status(201).json({ newCourse })
})

//@desc update course of authorized user
//@route PUT /api/courses/:id
//@access private
const updateCourse = asyncHandler( async(request, response) => {
    const { id } = request.params

    const course = await Course.findById(id)
    if(!course){
        response.status(400)
        throw new Error("Course not found")
    }

    const user = await User.findById(request.user._id)
    // if(course.user.toString() !== user._id){
    if(!course.user.equals(user._id)){
        response.status(401)
        throw new Error("Not Authorized")
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, request.body, { new: true})
    response.status(200).json(updatedCourse)
})


//@desc delete course of authorized user
//@route DELETE /api/courses/:id
//@access private
const deleteCourse = asyncHandler( async(request, response) => {
    const { id } = request.params
    
    const course = await Course.findById(id)
    if(!course){
        response.status(400)
        throw new Error("Course not found")
    }

    const user = await User.findById(request.user._id)
    // if(course.user.toString() !== user._id){
    if(!course.user.equals(user._id)){
        response.status(401)
        throw new Error("Not Authorized")
    }

    await Course.findByIdAndDelete(id)
    response.status(200).json({message: `course of ${id} deleted`})
})

module.exports = {
    getAllCourses,
    getUserCourses,
    createCourse,
    updateCourse,
    deleteCourse
}