const VisitLog = require('../models/VisitsLog');
const ErrorResponse = require('../Utils/errorResponse');
const asyncHandler = require('../middleware/async');
//const Bootcamp = require('../models/Bootcamps');
const { json } = require('express/lib/response');
const Patients = require('../models/Patients');

// @desc    Get all patient logs
// @route   Get /api/v1/visitlog
// @access  Private

exports.getVisitLogs = asyncHandler(async (req, res, next) => {
    if(req.user.role !== 'clerk') {
        return next(new ErrorResponse(`The user with ID ${req.user.id} can not access`, 400));
    }
    
    const visitlog = await VisitLog.find().populate({
        path: 'patient',
        select: 'familyname age phone'
    });
    
    res.status(200).json({success: true, count: visitlog.length, data: visitlog});
    
});


// @desc    Get single vistlog
// @route   Get /api/v1/visitlog/:id
// @access  Public

exports.getVisitLog = asyncHandler(async (req, res, next) => {
    const visitlog = await VisitLog.findById(req.params.id).populate({
        path: 'patient',
        select: 'familyname age phone'
    });
    if(!VisitLog) {
        return next(
            new ErrorResponse(`Can not find this Visit Log id no. ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: visitlog

    });
});


// @desc    Add visit log
// @route   Post /api/v1/patient/:patientId/visitlog
// @access  Private

exports.addVisitLog = asyncHandler(async (req, res, next) => {
    req.body.patient = req.params.patientId;
    req.body.user = req.user.id;

    const patient = await Patients.findById(req.params.patientId);

    if(!patient) {
        return next(
            new ErrorResponse(`No patient with id no. ${req.params.patientId}`, 404)
        );
    }

   // If the user is not a clerk
   if(req.user.role === 'clerk') {
    return next(new ErrorResponse(`The user with ID ${req.user.id} can not access`, 400));
}

    const visitlog = await VisitLog.create(req.body);
    res.status(201).json({
        success: true,
        data: visitlog

    });
});


// @desc    Update visitlog
// @route   Post /api/v1/visitlog/:id
// @access  Private

exports.updateVisitLog = asyncHandler(async (req, res, next) => {
    let visitlog = await VisitLog.findById(req.params.id);

    if(!visitlog) {
        return next(
            new ErrorResponse(`No visit with id no. ${req.params.id}`, 404)
        );
    }
     // Make sure user is not clerk & not authority
     if(req.user.role === 'clerk' || req.user.role ==='authority') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to update
        this visitlog`, 401));

    }
    visitlog = await VisitLog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true});

    res.status(201).json({
        success: true,
        msg: `Visitlog ${visitlog.name} has been updated`,
        data: visitlog

    });
});


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