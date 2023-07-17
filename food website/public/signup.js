// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-analytics.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDhXi12XHL0Nk4tQvA4wXSIPG6YnZ-bPwA",
    authDomain: "junkies-site.firebaseapp.com",
    databaseURL: "https://junkies-site-default-rtdb.firebaseio.com",
    projectId: "junkies-site",
    storageBucket: "junkies-site.appspot.com",
    messagingSenderId: "446209595584",
    appId: "1:446209595584:web:5eca5f253f7f6e8f393525",
    measurementId: "G-YSGZPWGTCH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const databs = getDatabase();

var name = document.getElementById("name");
var email = document.getElementById("email");
var password = document.getElementById("password");

window.signUp = function() {
    var userObj = {
        name: name.value,
        email: email.value,
        password: password.value,
    };
    console.log(userObj);
    createUserWithEmailAndPassword(auth, userObj.email, userObj.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            userObj.id = user.uid;

            var userReference = ref(database, `users/${userObj.id}`);
            set(userReference, userObj);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            // ..
        });
};