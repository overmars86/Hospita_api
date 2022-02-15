const VisitLog = require('../models/VisitsLog');
const ErrorResponse = require('../Utils/errorResponse');
const asyncHandler = require('../middleware/async');
//const Bootcamp = require('../models/Bootcamps');
const { json } = require('express/lib/response');

// @desc    Get all patient logs
// @route   Get /api/v1/patient/:patientId/visitlog
// @access  Private

exports.getVisitLog = asyncHandler(async (req, res, next) => {
    if(req.params.patientId) {
        const visitlog = await VisitLog.find({patient: req.params.patientId});
        return res.status(200).json({
            success: true,
            count: visitlog.length,
            data: visitlog});
    } else {
       res.status(200).json(res.advancedResults);
    }
});


// @desc    Get single course
// @route   Get /api/v1/courses/:id
// @access  Public

// exports.getCourse = asyncHandler(async (req, res, next) => {
//     const course = await Course.findById(req.params.id).populate({
//         path: 'bootcamp',
//         select: 'name description'
//     });
//     if(!Course) {
//         return next(
//             new ErrorResponse(`Can not find this Course id no. ${req.params.id}`, 404)
//         );
//     }

//     res.status(200).json({
//         success: true,
//         count: course.length,
//         data: course

//     });
// });


// // @desc    Add course
// // @route   Post /api/v1/bootcamps/:bootcampsId/courses
// // @access  Private

// exports.addCourse = asyncHandler(async (req, res, next) => {
//     req.body.bootcamp = req.params.bootcampId;
//     req.body.user = req.user.id;

//     const bootcamp = await Bootcamp.findById(req.params.bootcampId);

//     if(!bootcamp) {
//         return next(
//             new ErrorResponse(`No bootcamp with id no. ${req.params.bootcampId}`, 404)
//         );
//     }
//     // Make sure user is bootcamp owner
//     if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
//         return next(new ErrorResponse(`User ${req.user.id} is not authorized to update
//         this course`, 401));

//     }
//     const course = await Course.create(req.body);
//     res.status(201).json({
//         success: true,
//         data: course

//     });
// });


// // @desc    Update course
// // @route   Put /api/v1/courses/:id
// // @access  Private

// exports.updateCourse = asyncHandler(async (req, res, next) => {
//     let course = await Course.findById(req.params.id);

//     if(!course) {
//         return next(
//             new ErrorResponse(`No course with id no. ${req.params.id}`, 404)
//         );
//     }
//      // Make sure user is bootcamp owner
//      if(course.user.toString() !== req.user.id && req.user.role !== 'admin') {
//         return next(new ErrorResponse(`User ${req.user.id} is not authorized to update
//         this course`, 401));

//     }
//     course = await Course.updateOne(req.params.id, req.body, {
//         new: true,
//         runValidators: true});

//     res.status(201).json({
//         success: true,
//         msg: `Course ${course.name} has been updated`,
//         data: course

//     });
// });


// // @desc    Delete course
// // @route   Delete /api/v1/courses/:id
// // @access  Private

// exports.deleteCourse = asyncHandler(async (req, res, next) => {
//     const course = await Course.findById(req.params.id, req.body, {
//         new: true,
//         runValidators: true
//     });

//     if(!course) {
//         return next(
//             new ErrorResponse(`No course with id no. ${req.params.id}`, 404)
//         );
//     }
//      // Make sure user is bootcamp owner
//      if(course.user.toString() !== req.user.id && req.user.role !== 'admin') {
//         return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete
//         this course`, 401));

//     }
//     await course.remove();
//     console.log(Course.name);
//     res.status(201).json({
//         success: true,
//         msg: `Course ${course.name} has been deleted`,
//         data: {}

//     });
// });