const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'abinashbijaya@gmail.com',
        pass: 'eohsyvatrrekwcbz'
    }
});

const sendMail = async (email, otp) => {
    const mailoption = {
        from: 'abinashbijaya@gmail.com',
        to: email,
        subject: 'This only for testing',
        text: `your verification OTP is ${otp}.This OTP is valid for only 3 minutes.`
    };

    const result = await transporter.sendMail(mailoption);
    return result;
}
module.exports = sendMail;