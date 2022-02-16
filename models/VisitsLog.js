const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema(
    {
      temp: {
        type: String,
        maxlength: [50, 'temp can not be more than 50 characters'],
        unique: false
      },
      weight: {
        type: Number,
        unique: false
      },
      description: {
        type: String,
        required: [false, 'Please add a description'],
        maxlength: [500, 'Description can not be more than 500 characters'],
        unique: false
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
        unique: false
      },
      doctorname: {
        type: [String],
        enum: ['doctor A', 'doctor B', 'doctor C'],
        unique: false
      },
      doctoropinion: {
        type: String,
        maxlength: [500, 'Description can not be more than 500 characters']
      },
      photo: {
        type: String,
        default: 'no-photo.jpg',
        unique: false
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
    }
  );

// Reverse populate
// VisitSchema.virtual(
//   'visitlog', {
//     ref: 'visitlog',
//     localField: '_id',
//     foreignField: 'patient',
//     justOne: false
//   }
// );

module.exports = mongoose.model('Visitlog', VisitSchema);