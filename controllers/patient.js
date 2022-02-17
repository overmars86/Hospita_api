const path = require('path');
const Patients = require('../models/Patients');
const ErrorResponse = require('../Utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all patients
// @route   Get /api/v1/patient
// @access  Private
exports.getPatients = asyncHandler(async (req, res, next) => {

    // If the user is not a clerk
    if(req.user.role !== 'clerk') {
        return next(new ErrorResponse(`The user with ID ${req.user.id} can not access`, 400));
    }
        const patient = await Patients.find();

        res.status(200).json({success: true, count: patient.length, data: patient});

        //res.status(200).json(res.advancedResults);

});


// @desc    Get single patient
// @route   Get /api/v1/patient/:id
// @access  Private
exports.getPatient = asyncHandler(async (req, res, next) => {

        const patient = await Patients.findById(req.params.id).populate({
            path: 'Visitlog',
            select: 'createdAt temp weight description description_2 doctorname addmission ward'
        });
        if(!patient) {
            return next(
                new ErrorResponse( `No Patient found with id no. ${req.params.id}`, 404));
        }
        // If the user is not a clerk
        if(req.user.role !== 'clerk') {
            return next(new ErrorResponse(`The user with ID ${req.user.id} can not access`, 400));
    }
        res.status(200).json({
            success: true,
                data: patient

        });
});


// @desc    Create new patient
// @route   POST /api/v1/patient
// @access  Private
exports.createPatient = asyncHandler(async (req, res, next) => {
    // Add user to req.body
    req.body.user = req.user.id;

    
    // If the user is not an admin, they can only add one bootcamp
    if(req.user.role !== 'clerk') {
        return next(new ErrorResponse(`The user with ID ${req.user.id} can not create a new
        patient`, 400));
    }

    const patient = await Patients.create(req.body);
    res.status(201).json({
        success: true,
        data: patient
    });
});


// @desc    Update patient
// @route   PUT /api/v1/patient/:id
// @access  Private
exports.updatePatient = asyncHandler(async (req, res, next) => {
        let patient = await Patients.findById(req.params.id);
    
        if(!patient) {
            return next(
                new ErrorResponse( `No Patient found with id no. ${req.params.id}`, 404)
            );
        }

        // Make sure user is clerk
        if(req.user.role !== 'clerk') {
            return next(new ErrorResponse(`User ${req.params.id} is not authorized to update
            patients`, 401));

        }
        patient = await Patients.findOneAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({success: true, msg: 'updated successfully'});
    });


// @desc    Delete patient
// @route   DELETE /api/v1/patient/:id
// @access  Private
exports.deletePatient = asyncHandler(async (req, res, next) => {
    const patient = await Patients.findById(req.params.id);
        if(!patient) {
            return next(
                new ErrorResponse( `patient not found with id no. ${req.params.id}`, 404));
    }
         // Make sure user is clerk
         if(req.user.role !== 'clerk') {
            return next(new ErrorResponse(`User ${req.params.id} is not authorized to delete
            this patient`, 401));

        }
            bootcamp.remove();

    res.status(200).json({
        success:true, msg: 'patient id.' + req.params.id + ' has been deleted'});
});

