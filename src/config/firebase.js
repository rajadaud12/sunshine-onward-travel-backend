// backend/src/config/firebase.js
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert('E:/sot-backend/serviceAccountKey.json'), // Adjust path if needed
});

module.exports = admin;