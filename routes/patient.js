const express = require('express');
const {getPatients,
    createPatient,
    updateBootcamps,
    deleteBootcamps,
    getBootcamp,
    bootcampPhotoUpload
 } = require('../controllers/patient');

const Patients = require('../models/Patients');

 // Include other resource routers
//const visitlogRoute = require('./visitlog');
const advancedResults = require('../middleware/advance');

const router = express.Router();
const {protect, authorize} = require('../middleware/auth');

// Re-route into other resource routers
//router.use('/:patientId/visitlog', visitlogRoute);

// Uploading photo route
//router.route('/:id/photo').put(protect, authorize('publisher','admin') ,bootcampPhotoUpload);

router.route('/').get(getPatients)
//router.route('/').get(advancedResults(Patients, 'visitlog'),getPatients)
.post(protect,authorize('clerk'),createPatient);
// router.route('/:id').put(protect,authorize('publisher','admin'),updateBootcamps)
// .delete(protect,authorize('publisher','admin'),deleteBootcamps).get(getBootcamp);

module.exports = router;