// backend/src/features/auth/auth.service.js
const admin = require('../../config/firebase');
const { v4: uuidv4 } = require('uuid');
const { sendOTP } = require('../../utils/sendEmail');

const firestore = admin.firestore();

function sanitizeEmailForDocId(email) {
  if (!email || typeof email !== 'string' || !email.trim()) {
    throw new Error('Invalid email');
  }
  // Replace a set of characters that Firestore doc ids don't like.
  return email
    .trim()
    .toLowerCase()
    .replace(/\./g, '_dot_')
    .replace(/@/g, '_at_')
    .replace(/\//g, '_slash_')
    .replace(/\\/g, '_bslash_')
    .replace(/\$/g, '_dollar_')
    .replace(/#/g, '_hash_')
    .replace(/\[/g, '_lbr_')
    .replace(/\]/g, '_rbr_');
}

async function sendOtp(email, name = null) {
  if (!email || typeof email !== 'string' || !email.trim()) {
    throw new Error('Invalid email provided to sendOtp');
  }

  // Check if user already exists
  try {
    await admin.auth().getUserByEmail(email);
    throw new Error('User already exists');
  } catch (error) {
    if (error.code !== 'auth/user-not-found') {
      throw error; // Rethrow if not "not found" error
    }
    // Proceed if user does not exist
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  const docId = sanitizeEmailForDocId(email);

  const expiresAt = admin.firestore.Timestamp.fromMillis(Date.now() + 10 * 60 * 1000); // 10 min

  console.log(`[auth.service] sendOtp -> email: ${email}, docId: ${docId}, otp: ${otp}`);

  // Check for existing OTP doc to preserve name if resend
  const otpDocRef = firestore.collection('otps').doc(docId);
  let finalName = name;
  const existingDoc = await otpDocRef.get();
  if (existingDoc.exists) {
    const existingData = existingDoc.data();
    finalName = name || existingData.name || null;
  }

  await otpDocRef.set({
    email,
    otp,
    name: finalName,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    expiresAt
  });

  // Fire and forget email send (but await for easier debugging)
  await sendOTP(email, otp);
}

async function verifyOtp(email, otp) {
  if (!email || typeof email !== 'string' || !email.trim()) {
    throw new Error('Invalid email provided to verifyOtp');
  }
  if (!otp || typeof otp !== 'string' || !/^\d{4}$/.test(otp)) {
    throw new Error('Invalid OTP format');
  }

  const docId = sanitizeEmailForDocId(email);
  console.log(`[auth.service] verifyOtp -> email: ${email}, docId: ${docId}, otp: ${otp}`);

  const docRef = firestore.collection('otps').doc(docId);
  const doc = await docRef.get();
  if (!doc.exists) throw new Error('No OTP found for this email');

  const data = doc.data();
  if (!data) throw new Error('Malformed OTP document');

  // expiresAt is stored as a Firestore Timestamp
  if (!data.expiresAt) throw new Error('OTP has no expiry set');
  const expiresDate = data.expiresAt.toDate ? data.expiresAt.toDate() : new Date(data.expiresAt);
  if (new Date() > expiresDate) throw new Error('OTP expired');

  if (data.otp !== otp) throw new Error('Invalid OTP');

  // mark verified
  await docRef.update({ verified: true, verifiedAt: admin.firestore.FieldValue.serverTimestamp() });

  return data.name;
}

async function createUser(email, password) {
  if (!email || typeof email !== 'string' || !email.trim()) {
    throw new Error('Invalid email provided to createUser');
  }
  if (!password || typeof password !== 'string' || password.length < 6) {
    throw new Error('Invalid password. Must be at least 6 characters.');
  }

  const docId = sanitizeEmailForDocId(email);
  console.log(`[auth.service] createUser -> email: ${email}, docId: ${docId}`);

  const otpDocRef = firestore.collection('otps').doc(docId);
  const doc = await otpDocRef.get();
  if (!doc.exists) throw new Error('OTP not found');
  const otpData = doc.data();
  if (!otpData || !otpData.verified) throw new Error('OTP not verified');

  const name = otpData.name || email.split('@')[0];

  // Create the user in Firebase Auth
  const user = await admin.auth().createUser({
    email,
    password,
    displayName: name,
    emailVerified: true
  });

  await firestore.collection('users').doc(user.uid).set({
    name,
    email,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  // Clean up OTP doc
  await otpDocRef.delete();

  return user;
}

async function guestLogin() {
  const guestUid = `guest_${uuidv4()}`;
  console.log(`[auth.service] guestLogin -> generating for uid: ${guestUid}`);

  // Create Firestore doc first (admin has full access)
  await firestore.collection('users').doc(guestUid).set({
    name: 'Guest',
    email: null,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    isGuest: true
  });

  // Generate custom token
  const token = await admin.auth().createCustomToken(guestUid);

  return { token };
}

module.exports = { sendOtp, verifyOtp, createUser, guestLogin };