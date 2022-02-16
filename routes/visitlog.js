const express = require('express');
const VisitLog = require('../models/VisitsLog');
const advancedResults = require('../middleware/advance');
const {getVisitLogs, getVisitLog, addVisitLog, updateCourse, deleteCourse
 } = require('../controllers/visitlogs');

const router = express.Router({ mergeParams: true });

const {protect, authorize} = require('../middleware/auth');

router.route('/').get(protect, authorize('clerk'),getVisitLogs)
// get(advancedResults(VisitLog, {
//     path: 'patient', select: 'name phone'
// }), getVisitLogs)
.post(protect,authorize('clerk'),addVisitLog);
router.route('/:id').get(getVisitLog);
//.put(protect,authorize('clerk'),
// updateCourse).delete(protect,authorize('clerk'),deleteCourse);


module.exports = router;