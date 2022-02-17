const User = require('../models/Users');
const ErrorResponse = require('../Utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../Utils/sendemail');
const crypto = require('crypto');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
    const {name, email, phone,password, role } = req.body;

    // Create User
    const user = await User.create({
        name,
        email,
        phone,
        password,
        role
    });

    // Create token
    sendTokenResponse(user, 200, res);
});


// @desc    Login user
// @route   POST /api/v1/auth/register/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
    const {email,password} = req.body;

    // Validate the email & Password
    if(!email || !password) {
        return next(new ErrorResponse('Please provide a valid email and password', 400));
    }

    // Check for user
    const user = await User.findOne({email }).select('+password');
    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check if password macthes
    const isMatch = await user.matchPassword(password);
    if(!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

   sendTokenResponse(user, 200, res);
});


// @desc    Current logged in user
// @route   POST /api/v1/auth//me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        data: user
    });
});

// @desc    Forget Password
// @route   POST /api/v1/auth/forgetpassword
// @access  Public
exports.forgetPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if(!user) {
        return next(new ErrorResponse('There is no user with that email', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();
    // Update the database
    await user.save({validateBeforeSave: false});

     // Create reset URL
     const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

     const message = `You are receiving this email because you (or someone else) 
     has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;
 
     try {
         await sendEmail({
             email: user.email,
             subject: 'Password rest token',
             message
         });
         res.status(200).json({success: true, data: 'Email sent'});
     } catch (err) {
         console.log(err);
         user.resetPasswordToken = undefined;
         user.resetPasswordExpire = undefined;
 
         await user.save({validateBeforeSave: false});
         return next(new ErrorResponse('Email could not be sent', 500));
     }

    res.status(200).json({
        success: true,
        data: user
    });
});



// @desc    Reset password
// @route   POST /api/v1/resetpassword/:resettoken
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {

    // Get hashed token
    const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

    // Find the user based on the token & check the expairy
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    });

    if(!user) {
        return next(new ErrorResponse('Invalid Token', 400));
    }

    // Set a new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
});

// Get token form model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if(process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
    .status(statusCode)
    .cookie('token', token, options)
    .json({success: true, token});
};