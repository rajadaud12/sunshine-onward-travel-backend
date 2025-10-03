// backend/src/utils/sendEmail.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

async function sendOTP(email, otp) {
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Your SOT OTP Code',
    text: `Your OTP for sign-up is ${otp}. It expires in 10 minutes.`
  });
}

module.exports = { sendOTP };