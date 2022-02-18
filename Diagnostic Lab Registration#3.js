const mongoose = require('mongoose');
const Registration = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        max: 255,
        min: 6
	},
    Age: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    Gender: {
        type: String,
        required: true,
        max: 6,
        min: 4
    },
    Test_Department: {
        type: String,
        required: true,
        default: 'Pathology',
        required: true
    },
    Phone_No: {
        type: Number,
        min: 7,
        max:10,
        required: true
    },
    Emergency_Contact_Name: {
        type: String,
        min: 3,
        max: 20,
        required: true
    },
    Emergency_Contact_No: {
        type: Number,
        required: true,
        max: 10,
        min: 7
    },
    Country: {
        type: String,
        default: 'United Arab Emirates',
        required: true
    },
    Emirate: {
        type: String,
        default: 'Dubai',
        required: true
    },
    Nationality: {
        type: String,
        required: true,
        max: 20
    },
    Address: {
        type: String,
        required: true,
        max: 50,
        min: 2
    },
    Consulting_Doctor: {
        type: String,
        required: true,
        max: 20,
        min: 10
    },
    Test_Date: {
        type: Date,
        default: Date.now,
        required: true
    },
    Result_Date: {
        type: Date,
        required: true
    },
    Medical_Insurance_Company: {
        type: String,
        required: true,
        max: 20
    },
    Covered_by_Medical_Insurance: {
        type: String,
        required: true,
        max: 3
    },
    Test_Price: {
        type: String,
        default: '100 AED',
        required: true,
    }
});
module.exports = mongoose.model('Registration', Registration);