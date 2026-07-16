import * as admin from "firebase-admin";

// Define the shape of your service account configuration
interface ServiceAccount {
  projectId?: string;
  clientEmail?: string;
  privateKey?: string;
}

const initializeAdmin = () => {
  // @ts-expect-error - Firebase admin apps type error
  if (!admin.apps.length) {
    try {
      const serviceAccount: ServiceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Handle escaped newline characters in private key
        privateKey: process.env.FIREBASE_PRIVATE_KEY
          ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
          : undefined,
      };

      if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
        console.warn("Firebase Admin: Missing environment variables. Admin SDK not initialized properly.");
      }

      admin.initializeApp({
        // @ts-expect-error - Firebase admin credential type error
        credential: admin.credential.cert(serviceAccount),
      });
    } catch (error) {
      console.error("Firebase admin initialization error", error);
    }
  }
  return admin;
};

const adminApp = initializeAdmin();
// @ts-expect-error - Firebase admin apps and firestore type error
const adminDb = admin.apps.length > 0 ? admin.firestore() : null;

export { adminApp, adminDb };
