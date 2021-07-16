const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const pharmaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name of the Pharmacy is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  // user: {
  //   type: String,
  //   enum: ['pharmacist', 'admin'],
  //   default: 'pharmacist',
  // },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'confirmation required'],
    // works on create or Save
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords dont match',
    },
  },
  lat: { type: String },
  lon: { type: String },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
      address: String,
      description: String,
    },
    coordinates: [Number],
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// Indexing

pharmaSchema.index({ location: '2dsphere' });

pharmaSchema.pre('save', function (next) {
  this.location = {
    type: 'Point',
    coordinates: [this.lat, this.lon],
  };

  next();
});

// set password changed at property

pharmaSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 2000;
  next();
});

// hash password
pharmaSchema.pre('save', async function (next) {
  // hash only when password is modified
  if (!this.isModified('password')) return next();

  // hash with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // delete confirm password
  this.confirmPassword = undefined;
  next();
});

// query middleware
pharmaSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

// compare for passwords
pharmaSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// check if password is changed

pharmaSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
};
// create Reset Token
pharmaSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const Pharmacy = mongoose.model('Pharmacy', pharmaSchema);
module.exports = Pharmacy;
