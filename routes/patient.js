const express = require('express');
const {getPatients,
    createPatient,
    updatePatient,
    deletePatient,
    getPatient
 } = require('../controllers/patient');

const Patients = require('../models/Patients');

//Include other resource routers
const visitlogRoute = require('./visitlog');
const advancedResults = require('../middleware/advance');

const router = express.Router();
const {protect, authorize} = require('../middleware/auth');

//Re-route into other resource routers
router.use('/:patientId/visitlog', visitlogRoute);

router.route('/').get(protect, authorize('doctor', 'clerk','nurse','pharma'),getPatients);
router.route('/').get(advancedResults(Patients, 'visitlog'),getPatients)
.post(protect,authorize('clerk'),createPatient);
router.route('/:id').put(protect,authorize('clerk'),updatePatient)
.delete(protect,authorize('clerk'),deletePatient).get(protect, authorize(
    'doctor', 'clerk','nurse','pharma'),getPatient);

module.exports = router;