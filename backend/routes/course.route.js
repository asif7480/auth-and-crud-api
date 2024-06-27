const express = require("express")
const router = express.Router()
const {
    getUserCourse,
    createCourse,
    updateCourse,
    deleteCourse
} = require("../controllers/course.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.route("/").get(getUserCourse).post(createCourse)
router.route("/:id").put(updateCourse).delete(deleteCourse)

module.exports = router