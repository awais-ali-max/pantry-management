// firebase/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB7PbytOCE7XjEb28uQYSPsMF_kAtAzKIE",
    authDomain: "pantry-tracker-228c2.firebaseapp.com",
    projectId: "pantry-tracker-228c2",
    storageBucket: "pantry-tracker-228c2.appspot.com",
    messagingSenderId: "853652306885",
    appId: "1:853652306885:web:625a5ba20caf147305e9ac",
    measurementId: "G-LKJFKZGT4V"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };