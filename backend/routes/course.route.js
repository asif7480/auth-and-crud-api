const express = require("express")
const router = express.Router()
const {
    getAllCourses,
    getUserCourses,
    createCourse,
    updateCourse,
    deleteCourse
} = require("../controllers/course.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.route("/").get(getAllCourses).get(authMiddleware, getUserCourses).post(authMiddleware, createCourse)
router.route("/:id").put(authMiddleware, updateCourse).delete(authMiddleware, deleteCourse)

module.exports = router