const mongoose = require('mongoose');
const Lab = new mongoose.Schema({
    lab_name: {
        type: String,
        required: false,
        default: 'Pathology'
    },
    Test_Date: {
        type: Date,
        default: Date.now,
        required: false
    },
    Result_Date: {
        type: Date,
        required: false
    },
    Medical_Insurance_Company: {
        type: String,
        required: false,
        max: 20
    },
    Covered_by_Medical_Insurance: {
        type: Boolean,
        required: false,
        default: true
    },
    Test_Price: {
        type: String,
        default: '100 AED',
        required: false,
    },
    patient: {
        type: mongoose.Schema.ObjectId,
        ref: 'Patient',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
});
module.exports = mongoose.model('Lab', Lab);