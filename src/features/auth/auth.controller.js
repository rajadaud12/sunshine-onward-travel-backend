// backend/src/features/auth/auth.controller.js
const authService = require('./auth.service');

exports.sendOtp = async (req, res) => {
  try {
    const { email, name } = req.body; // name is optional
    await authService.sendOtp(email, name);
    res.status(200).send('OTP sent');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    await authService.verifyOtp(req.body.email, req.body.otp);
    res.status(200).send('OTP verified');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await authService.createUser(req.body.email, req.body.password);
    res.status(200).json({ uid: user.uid });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.guestLogin = async (req, res) => {
  try {
    const { token } = await authService.guestLogin();
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};