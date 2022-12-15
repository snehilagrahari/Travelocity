import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBBNYUL_ftg_cGn9DObbUCIvblNk6VoY4E",
    authDomain: "wanderworld-f4027.firebaseapp.com",
    projectId: "wanderworld-f4027",
    storageBucket: "wanderworld-f4027.appspot.com",
    messagingSenderId: "79102835767",
    appId: "1:79102835767:web:b87cfedb1c1a7c1c2353b2",
    measurementId: "G-HY8TBJ6YV2"
};

const authApp = initializeApp(firebaseConfig);

export default authApp