// Firebase configuration
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "your api key",
  authDomain: "......",
  projectId: "novair-project",
  storageBucket: "....",
  messagingSenderId: "your messagingsenderid",
  appId: "your api id",
  measurementId: "G-ZM4MS0J6WL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Collection name for site config
export const SITE_CONFIG_DOC = "siteConfig";
export const DEFAULT_DOC_ID = "default";

// Helper function to get site config from Firestore
export async function getSiteConfigFromFirestore() {
  try {
    const docRef = doc(db, SITE_CONFIG_DOC, DEFAULT_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Error getting site config from Firestore:", error);
    return null;
  }
}

// Helper function to save site config to Firestore
export async function saveSiteConfigToFirestore(config: any) {
  try {
    const docRef = doc(db, SITE_CONFIG_DOC, DEFAULT_DOC_ID);
    await setDoc(docRef, {
      ...config,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error("Error saving site config to Firestore:", error);
    return false;
  }
}

// Helper function to subscribe to real-time updates
export function subscribeToSiteConfig(callback: (data: any) => void) {
  const docRef = doc(db, SITE_CONFIG_DOC, DEFAULT_DOC_ID);
  return onSnapshot(
    docRef,
    (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data());
      }
    },
    (error) => {
      console.error("Error subscribing to site config:", error);
    },
  );
}
