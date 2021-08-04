const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  pharmacy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Pharmacy',
    required: [true, 'Medication must belong to a Pharmacy'],
  },
  name: {
    type: String,
    required: [true, 'Name of the medication is required!'],
  },
  available: {
    type: Boolean,
    // required: true,
    default: true,
  },
  // user: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'User',
  //   required: [true, 'Medication must belong to a user'],
  // },
  price: {
    type: Number,
    required: [true, 'Price of the medication is required!'],
  },
});


// query middleware
medicationSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ available: { $ne: false } });
  next();
});



medicationSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.populate({
    path: 'pharmacy',
    select: 'name',
  });
  next();
});

const Medication = mongoose.model('Medication', medicationSchema);
module.exports = Medication;
