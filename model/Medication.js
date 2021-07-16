const mongoose = require('mongoose');

const medication = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  price: {
    type: Number,
    required: [true, 'Price of the medication is required!'],
  },
});

const Medication = mongoose.model('Medication', medication);
module.exports = Medication;
