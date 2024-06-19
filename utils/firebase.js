import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
    APP_ID,
    AUTH_DOMAIN,
    FB_API_KEY,
    MESSAGING_SENDER_ID,
    PROJECT_ID,
    STORAGE_BUCKET
} from "../config";

const firebaseConfig = {
    apiKey: FB_API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
