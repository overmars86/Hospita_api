const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        required: [true, 'Please add a name']
    },
    familyname: {
        type: String,
        trim: true,
        required: [true, 'Please add a description']
    },
    phone: {
        type: Number,
        required: true,
        minlength: 10,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    education: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
}});



module.exports = mongoose.model('Patient', PatientSchema);