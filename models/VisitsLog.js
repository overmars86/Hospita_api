const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema(
    {
      temp: {
        type: String,
        maxlength: [50, 'Name can not be more than 50 characters']
      },
      weight: {
        type: Number,
      },
      description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description can not be more than 500 characters']
      },
      description_2: {
        type: String,
        maxlength: [500, 'Description can not be more than 500 characters']
      },
      addmission: {
        type: Boolean,
        default: false
      },
      ward: {
        type: [String],
        enum: ['ward A','ward B','ward C','NA'],
        default: 'NA'
      },
      doctorname: {
        type: [String],
        enum: ['doctor A', 'doctor B', 'doctor C']
      },
      doctoropinion: {
        type: String,
        maxlength: [500, 'Description can not be more than 500 characters']
      },
      photo: {
        type: String,
        default: 'no-photo.jpg'
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
      patient: {
        type: mongoose.Schema.ObjectId,
        ref: 'Patient',
        required: true
      }
    },
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    }
  );

// Reverse populate
VisitSchema.virtual(
  'visitlog', {
    ref: 'visitlog',
    localField: '_id',
    foreignField: 'patient',
    justOne: false
  }
);

module.exports = mongoose.model('Visitlog', VisitSchema);