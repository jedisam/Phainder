const crypto = require('crypto');
const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const pharmaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Name of the Pharmacy is required'],
    },

    openingHour: {
      type: String,
      required: [true, 'Opening Hour of the Pharmacy is required'],
    },
    closingHour: {
      type: String,
      required: [true, 'Closing Hour is Required'],
    },
    lat: { type: String },
    lon: { type: String },
    address: {
      type: String,
      required: [true, 'Address of the pharmacy is required!'],
    },
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
    createdAt: {
      type: Date,
      default: Date.now,
    },

    // medications: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Medication',
    //   },
    // ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }

  );

pharmaSchema.pre('save', function (next) {
  this.location = {
    type: 'Point',
    coordinates: [this.lat, this.lon],
  };
  this.lat = undefined;
  this.lon = undefined;

  next();
});

// Virtual Populate
pharmaSchema.virtual('medications', {
  ref: 'Medication',
  foreignField: 'pharmacy',
  localField: '_id',
});

// Indexing

pharmaSchema.index({ location: '2dsphere' });
// Geocode and create location
// pharmaSchema.pre('save', async function (next) {
//   const loc = await geocoder.geocode(this.address);
//   this.location = {
//     type: 'Point',
//     coordinates: [loc[0].longtiude, loc[0].latitude],
//   };
//   console.log(loc);
// });

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


// pharmaSchema.pre(/^find/, function (next) {
//   // this points to the current query
//   this.populate({
//     path: 'medications',
//     select: 'name quantity',
//   });
//   next();
// });

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
