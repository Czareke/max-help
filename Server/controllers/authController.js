    const User=require('../Model/userModel')
    const catchAsync = require('../utils/catchAsync');
    const AppError = require('../utils/appError');
    const jwt = require('jsonwebtoken');
    const { promisify } = require('util');

    const signToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
        });
    };

    //@desc user registration
    exports.createUser = catchAsync(async (req, res, next) => {
        const newUser = await User.create({
            username:req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        });
        const token = signToken(newUser._id);
        res.status(201).json({
        status: 'success',
        token,
        data: newUser,
        });
    });
    // @desc user login
        exports.login = catchAsync(async (req, res, next) => {
            const { email, password } = req.body;
        
            // Debugging: Log the request body
            console.log('Request body:', req.body);
        
            // Check for missing fields
            if (!email || !password) {
            return next(new AppError('Please provide email and password', 400));
            }
        
            // Find the user and explicitly select the password field
            const user = await User.findOne({ email }).select('+password');
            if (!user || !(await user.comparePassword(password, user.password))) {
            return next(new AppError('Incorrect email or password', 401));
            }
        
            // Generate token
            const token = signToken(user._id);
        
            // Send the response
            res.json({
            status: 'success',
            token,
            data: {
                username: user.username,
                email: user.email,
            },
            });
        });
        
    // @desc forgot password
    
    exports.forgotPassword = catchAsync(async (req, res, next) => {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
        return next(new AppError('No user found with that email', 404));
        }
        // Generate OTP
        const otp = crypto.randomBytes(3).toString('hex'); // Generates a 6-digit hex string
        // Set OTP and its expiration time
        user.passwordResetOTP = otp;
        user.passwordResetOTPExpires = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes
        await user.save({ validateBeforeSave: false });
        // Send OTP to the user
        const message = `Your OTP for password reset is: ${otp}. It is valid for 15 minutes.`;
        await sendEmail({
        email: user.email, // Ensure this is correctly passed
        subject: 'Password Reset OTP',
        message: message,
        });
        res.status(200).json({
        status: 'success',
        message: 'OTP sent to email',
        });
    });
    // @desc reset password
    exports.resetPassword = catchAsync(async (req, res, next) => {
        const { otp, newPassword } = req.body;
        const user = await User.findOne({
        passwordResetOTP: otp,
        passwordResetOTPExpires: { $gt: Date.now() },
        });
        if (!user) {
        return next(new AppError('Invalid or expired OTP', 400));
        }
        // Update the user's password and confirmPassword for validation purposes
        user.password = newPassword;
        user.confirmPassword = newPassword;
        // Clear the OTP and its expiration time from the user's record
        user.passwordResetOTP = undefined;
        user.passwordResetOTPExpires = undefined;
        res.status(200).json({
        status: 'success',
        message: 'Password updated successfully',
        });
    });
    // @desc protect
    exports.protect = catchAsync(async (req, res, next) => {
        // 1) Get token from header and check if it exists
        let token;
        if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
        ) {
        token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
        return next(
            new AppError('You are not logged in! Please log in to get access', 401)
        );
        }
    
        // 2) Verify the token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    
        // 3) Check if user still exists
        const freshUser = await User.findById(decoded.id);
        if (!freshUser) {
        return next(
            new AppError('The user belonging to this token no longer exists.', 401)
        );
        }
    
        // 4) Check if user changed password after the token was issued
        if (freshUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError('User recently changed password! Please login again.', 401)
        );
        }
    
        // 5) Grant access to the protected route
        req.user = freshUser;
        next();
    });
    
    // @desc restrict to admin
    exports.restrictTo = (...roles) => {
        return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('Unauthorized to access this route', 403));
        }
        next();
        };
    };
    // Get the currently logged-in user's profile
    exports.getMe = catchAsync(async (req, res, next) => {
        const user = await User.findById(req.user.id);
        res.json(user);
    });
    // Update logged-in user's profile
    exports.updateMe = catchAsync(async (req, res, next) => {
        const { name, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { name, email },
        { new: true, runValidators: true }
        );
    
        if (!updatedUser) {
        return next(new AppError('User not found', 404));
        }
        res.json(updatedUser);
    });