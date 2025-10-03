// backend/src/middlewares/auth.js
const admin = require('../config/firebase');

async function verifyToken(req, res, next) {
  const idToken = req.headers.authorization?.split('Bearer ')[1];
  if (!idToken) return res.status(401).send('Unauthorized');
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
}

module.exports = verifyToken;