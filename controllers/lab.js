const Lab = require('../models/Lab');
const ErrorResponse = require('../Utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { json } = require('express/lib/response');
const Patients = require('../models/Patients');

// @desc    Get all labs
// @route   Get /api/v1/lab
// @access  Private

exports.getLabs = asyncHandler(async (req, res, next) => {
    if(req.user.role !== 'nurse') {
        return next(new ErrorResponse(`The user with ID ${req.user.id} can not access`, 400));
    }
    
    const lab = await Lab.find().populate({
        path: 'patient',
        select: 'familyname age phone'
    });
    
    res.status(200).json({success: true, count: lab.length, data: lab});
    
});


// @desc    Get single vistlog
// @route   Get /api/v1/lab/:id
// @access  Private

exports.getLab = asyncHandler(async (req, res, next) => {
    const lab = await Lab.findById(req.params.id).populate({
        path: 'patient',
        select: 'familyname age phone'
    });
    if(!Lab) {
        return next(
            new ErrorResponse(`Can not find this lab test id no. ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: lab

    });
});


// @desc    Add a lab test
// @route   Post /api/v1/patient/:patientId/lab
// @access  Private

exports.addLab = asyncHandler(async (req, res, next) => {
    req.body.patient = req.params.patientId;
    req.body.user = req.user.id;

    const patient = await Patients.findById(req.params.patientId);

    if(!patient) {
        return next(
            new ErrorResponse(`No patient with id no. ${req.params.patientId}`, 404)
        );
    }

   // If the user is not a clerk
   if(req.user.role !== 'nurse') {
    return next(new ErrorResponse(`The user with ID ${req.user.id} can not access`, 400));
}

    const lab = await Lab.create(req.body);
    res.status(201).json({
        success: true,
        data: lab

    });
});


// @desc    Update lab test
// @route   Post /api/v1/lab/:id
// @access  Private

exports.updateLab = asyncHandler(async (req, res, next) => {
    let lab = await Lab.findById(req.params.id);

    if(!lab) {
        return next(
            new ErrorResponse(`No lab test with id no. ${req.params.id}`, 404)
        );
    }
     // Make sure user is not clerk & not authority
     if(req.user.role !== 'nurse') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to update
        this lab test`, 401));

    }
    lab = await Lab.findOneAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true});

    res.status(201).json({
        success: true,
        msg: `Lab test ${lab.name} has been updated`,
        data: lab

    });
});