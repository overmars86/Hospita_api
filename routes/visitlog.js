const express = require('express');
const VisitLog = require('../models/VisitsLog');
const advancedResults = require('../middleware/advance');
const {getVisitLog, getCourse, addCourse, updateCourse, deleteCourse
 } = require('../controllers/visitlogs');

const router = express.Router({ mergeParams: true });

const {protect, authorize} = require('../middleware/auth');

router.route('/').get(advancedResults(VisitLog, {
    path: 'patient', select: 'name description'
}), getVisitLog);
// .post(protect,authorize('publisher','admin'),addCourse);
// router.route('/:id').get(getCourse).put(protect,authorize('publisher','admin'),
// updateCourse).delete(protect,authorize('publisher','admin'),deleteCourse);


module.exports = router;