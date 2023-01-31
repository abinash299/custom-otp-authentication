const sendMail = require('./nodemailer');
const User = require('../models/user');
const OTPsending = async (email, otp) => {
    try {
        const mail = await sendMail(email, otp);
        if (mail) {
            setTimeout(async () => {
                const data = await User.findOne({ userEmail: email });
                if (data.otp != "varified") {
                    await User.findByIdAndUpdate({ _id: data._id }, { otp: "otp is invalid" });
                }
            }, 60000);
            return mail;
        }
    }
    catch (error) {
        console.log("some error occours in sendOTP file");
        return "some error occours in sendOTP file";
    }

}
module.exports = OTPsending;