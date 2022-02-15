const path = require('path');
const Patients = require('../models/Patients');
const ErrorResponse = require('../Utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all patients
// @route   Get /api/v1/patients
// @access  Private
exports.getPatients = asyncHandler(async (req, res, next) => {

    // If the user is not an admin, they can only add one bootcamp
    // if(req.user.role == 'clerk') {
    //     return next(new ErrorResponse(`The user with ID ${req.user.id} can not access`, 400));
    // }
        res.status(200).json(res.advancedResults);
        //const bootcamps = await Bootcamp.find();

        //res.status(200).json({success: true,count: bootcamps.length ,data: bootcamps});
});
// @desc    Get single bootcamps
// @route   Get /api/v1/bootcamps/:id
// @access  Public
// exports.getBootcamp = asyncHandler(async (req, res, next) => {

//         const bootcamp = await Bootcamp.findById(req.params.id);
//         if(!bootcamp) {
//             return next(
//                 new ErrorResponse( `Bootcamp not found with id no. ${req.params.id}`, 404));
//         }
//         res.status(200).json({
//             success: true,
//                 data: bootcamp

//         });
// });
// // @desc    Create new patient
// // @route   POST /api/v1/patient
// // @access  Private
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
// // @desc    Update bootcamps
// // @route   PUT /api/v1/bootcamps/:id
// // @access  Private
// exports.updateBootcamps = asyncHandler(async (req, res, next) => {
//         let bootcamp = await Bootcamp.findById(req.params.id);
    
//         if(!bootcamp) {
//             return next(
//                 new ErrorResponse( `Bootcamp not found with id no. ${req.params.id}`, 404)
//             );
//         }

//         // Make sure user is bootcamp owner
//         if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
//             return next(new ErrorResponse(`User ${req.params.id} is not authorized to update
//             this bootcamp`, 401));

//         }
//         bootcamp = await Bootcamp.findOneAndUpdate(req.params.id, req.body, {
//             new: true,
//             runValidators: true
//         });

//         res.status(200).json({success: true, msg: 'updated successfully'});
//     });

// // @desc    Delete bootcamps
// // @route   DELETE /api/v1/bootcamps/:id
// // @access  Private
// exports.deleteBootcamps = asyncHandler(async (req, res, next) => {
//     const bootcamp = await Bootcamp.findById(req.params.id);
//         if(!bootcamp) {
//             return next(
//                 new ErrorResponse( `Bootcamp not found with id no. ${req.params.id}`, 404));
//     }
//          // Make sure user is bootcamp owner
//          if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
//             return next(new ErrorResponse(`User ${req.params.id} is not authorized to delete
//             this bootcamp`, 401));

//         }
//             bootcamp.remove();

//     res.status(200).json({
//         success:true, msg: 'bootcamp id.' + req.params.id + ' has been deleted'});
// });


// // @desc    Upload photo for bootcamp
// // @route   PUT /api/v1/bootcamps/:id/photo
// // @access  Private
// exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
//     const bootcamp = await Bootcamp.findById(req.params.id);
//     if(!bootcamp) {
//         return next(
//             new ErrorResponse( `Bootcamp not found with id no. ${req.params.id}`, 404));
// }
//  // Make sure user is bootcamp owner
//  if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
//     return next(new ErrorResponse(`User ${req.params.id} is not authorized to update
//     this bootcamp`, 401));

// }
// if(!req.files) {
//     return next(new ErrorResponse(`Please upload a file`, 400));
// }

// const file = req.files.file;
// // Make sure the file is a image file
// if(!file.mimetype.startsWith('image')) {
//     return next(new ErrorResponse('Please make sure the file you uploaded is a photo', 400));
// }
// // Check file size
// if(file.size > process.env.MAX_FILE_UPLOAD) {
//     return next(new ErrorResponse('Please choose a smaller image size and try again', 400));
// }

// // Create custom filename
// file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

// file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
//     if(err) {
//         console.error(err);
//         return next(err);
//     }
// });



// await Bootcamp.findByIdAndUpdate(req.params.id, {photo: file.name});
// res.status(200).json({
//     success:true, msg: 'A new photo uploaded', data: file.name});
// });