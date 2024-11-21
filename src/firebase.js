
import config from "./config";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: config.firebase.apiKey,
    authDomain: config.firebase.authDomain,
    projectId: config.firebase.projectId,
    storageBucket: config.firebase.storageBucket,
    messagingSenderId: config.firebase.measurementId,
    appId: config.firebase.appId,
    measurementId: config.firebase.measurementId,
  };


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage}; 