import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

let initialized = false;

const initializeFirebase = () => {
  if (initialized) {
    return;
  }

  const serviceAccountPath = path.join(
    process.cwd(),
    'firebase-service-account.json',
  );

  if (!fs.existsSync(serviceAccountPath)) {
    console.warn(
      'Firebase service account file not found. Firebase initialization skipped.',
    );
    return;
  }

  const serviceAccount = require(serviceAccountPath);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  initialized = true;

  console.log('✅ Firebase Admin Initialized');
};

export {admin, initializeFirebase};