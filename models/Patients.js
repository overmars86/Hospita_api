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
    Emergency_Contact_Name: {
        type: String,
        min: 3,
        max: 20,
        required: false
    },
    Emergency_Contact_No: {
        type: Number,
        required: false,
        max: 10,
        min: 7
    },
    Country: {
        type: String,
        default: 'United Arab Emirates',
        required: false
    },
    Emirate: {
        type: String,
        default: 'Dubai',
        required: false
    },
    Nationality: {
        type: String,
        required: false,
        max: 20
    },
    Address: {
        type: String,
        required: false,
        max: 50,
        min: 2
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
      }
);

// Reverse populate
PatientSchema.virtual(
    'Visitlog', {
      ref: 'Visitlog',
      localField: '_id',
      foreignField: 'patient',
      justOne: false
    }
  );

module.exports = mongoose.model('Patient', PatientSchema);