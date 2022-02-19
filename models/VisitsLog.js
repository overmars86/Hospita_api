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
      complaints: {
        type: String,
        maxlength: [500, 'complaints can not be more than 500 characters']
      },
      known_diseases: {
        type: String,
        maxlength: [500, 'diseases can not be more than 500 characters']

      },
      addmission: {
        type: Boolean,
        default: false,
        required: true
      },
      department: {
        type: [String],
        enum: ['Medicine', 'Surgery', 'Orthopedics', 'Pediatrics', 'ENT',
         'Ophthalmology', 'Gynecology', 'Dermatology', 'Oncology'],
         require: true
      },
      ward: {
        type: [String],
        enum: ['ward A','ward B','ward C','ward D'],
        unique: false,
        required: true
      },
      doctorname: {
        type: [String],
        enum: ['doctor A', 'doctor B', 'doctor C'],
        unique: false
      },
      doctoropinion: {
        type: String,
        maxlength: [500, 'opinion can not be more than 500 characters']
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



module.exports = mongoose.model('Visitlog', VisitSchema);