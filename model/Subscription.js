const crypto = require('crypto');
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: [String],
    required: [true, 'Subscription name is required'],
  },
  subscriptionList: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      date: Date,
    },
  ],
  source: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Subscription must belong to a user'],
  },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
module.exports = Subscription;
