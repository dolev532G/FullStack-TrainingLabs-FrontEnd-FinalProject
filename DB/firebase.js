import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDnir0IrAbN5qexiFaTsvzhsNRdsanajM8",
    authDomain: "node-48---react-final-project.firebaseapp.com",
    databaseURL: "https://node-48---react-final-project-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "node-48---react-final-project",
    storageBucket: "node-48---react-final-project.firebasestorage.app",
    messagingSenderId: "108646778757",
    appId: "1:108646778757:web:a782afd80c17d3c79ca6ec"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
