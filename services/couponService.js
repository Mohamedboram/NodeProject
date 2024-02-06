const Coupon = require('../models/couponModel');

// Get list of coupons
// GET /api/v1/coupons
// Private/Admin-Manager
exports.getCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json({
      status: 'success',
      data: {
        coupons,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get specific coupon by id
// GET /api/v1/coupons/:id
// Private/Admin-Manager
exports.getCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({
        status: 'fail',
        message: 'Coupon not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        coupon,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Create coupon
// POST /api/v1/coupons
// Private/Admin-Manager
exports.createCoupon = async (req, res, next) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        coupon: newCoupon,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update specific coupon
// PUT /api/v1/coupons/:id
// Private/Admin-Manager
exports.updateCoupon = async (req, res, next) => {
  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return the updated document
        runValidators: true, // Run validators on update
      }
    );

    if (!updatedCoupon) {
      return res.status(404).json({
        status: 'fail',
        message: 'Coupon not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        coupon: updatedCoupon,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete specific coupon
// DELETE /api/v1/coupons/:id
// Private/Admin-Manager
exports.deleteCoupon = async (req, res, next) => {
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);

    if (!deletedCoupon) {
      return res.status(404).json({
        status: 'fail',
        message: 'Coupon not found',
      });
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
