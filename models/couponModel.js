const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Coupon name required'],
      unique: true,
    },
    couponCode: {
      type: String,
      trim: true,
      required: [true, 'Coupon code required'],
      unique: true,
    },
    value: {
      type: Number,
      required: [true, 'Coupon value required'],
    },
    createdBy: {
      type: String, // Assuming createdBy is a user identifier
      required: [true, 'Creator information required'],
    },
    updatedBy: {
      type: String, // Assuming updatedBy is a user identifier
    },
    deletedBy: {
      type: String, // Assuming deletedBy is a user identifier
    },
    expireIn: {
      type: Number, // Assuming expireIn is the duration in seconds
      required: [true, 'Coupon expire duration required'],
    },
    discount: {
      type: Number,
      required: [true, 'Coupon discount value required'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Coupon', couponSchema);
