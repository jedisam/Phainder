const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  medicationName: {
    type: String,
    required: [true, 'Medication Name is required!'],
  },
  dose: {
    type: String,
    required: [true, 'Dose of the Medication is required!'],
  },
  MRN: {
    type: Number,
    required: [true, 'Medical Record number is required!'],
  },
  frequency: {
    type: Number,
    required: [true, 'Frequency per day of the medication is required'],
  },
  duration: {
    type: Number,
    required: [true, 'Number of days for the medication is required!'],
  },
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Prescription must belong to a user'],
  },
  prescribersName: {
    type: String,
    required: [true, 'Prescribers Name is required!'],
  },
});

prescriptionSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.populate({
    path: 'patient',
    select: 'name',
  });
  next();
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);
module.exports = Prescription;
