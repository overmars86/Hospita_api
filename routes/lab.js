const express = require('express');
const Lab = require('../models/Lab');
const advancedResults = require('../middleware/advance');
const {getLab, getLabs, addLab, updateLab
 } = require('../controllers/lab');

const router = express.Router({ mergeParams: true });

const {protect, authorize} = require('../middleware/auth');


router.route('/').get(protect, getLabs)
// get(advancedResults(VisitLog, {
//     path: 'patient', select: 'name phone'
// }), getVisitLogs)
.post(protect,authorize('nurse'),addLab);
router.route('/:id').get(protect, getLab).put(protect, updateLab);


module.exports = router;