const express = require('express');
const User = require('../models/user');
const routes = express.Router();
const OTPsending = require('../script/sendOTP');
const { body, validationResult } = require('express-validator');

routes.post('/createuser', [body('userEmail').isEmail(), body('password').isLength({ min: 5 })], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const otp = Math.floor(Math.random() * (999999 - 99999) + 99999);

    try {
        await User.create({
            userEmail: req.body.userEmail,
            password: req.body.password,
            otp: otp
        });
        const OTP = await OTPsending(req.body.userEmail, otp);
        if (OTP)
            res.status(200).json({ email: req.body.userEmail, status: "otp deliver sucessfully to your email" });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});

routes.post('/verifyotp', async (req, res) => {
    try {
        const myUser = await User.findOne({ userEmail: req.body.userEmail });
        if (myUser.otp === req.body.otp) {
            const otpverification = await User.findByIdAndUpdate({ _id: myUser._id }, { otp: "varified" });
            if (otpverification)
                res.json({ verify: "OTP is verify sucessfully" });
        }
        else
            res.json({ error: "Enter the valid OTP" });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }

});

routes.post('/resendotp', async (req, res) => {
    try {
        const otp = Math.floor(Math.random() * (999999 - 99999) + 99999);
        const userData = await User.findOneAndUpdate({ userEmail: req.body.userEmail }, { otp: otp });
        if (userData) {
            const OTPsender = await OTPsending(req.body.userEmail, otp);
            if (OTPsender)
                res.status(200).json({ email: req.body.userEmail, status: "otp deliver sucessfully to your email" });
        }
    }
    catch (err) {
        res.send({ error: "some error occured" });
    }
})

module.exports = routes;