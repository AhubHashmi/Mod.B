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


let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {

    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');

}

window.onscroll = () => {

    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    if (window.scrollY > 60) {
        document.querySelector('#scroll-top').classList.add('active');
    } else {
        document.querySelector('#scroll-top').classList.remove('active');
    }

}

// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }

// function fadeOut() {
//     setInterval(loader, 3000);
// }

// window.onload = fadeOut();

// let slideIndex = 1;
// showSlides(slideIndex);

// // Next/previous controls
// window.pushSlides = function(n) {
//     showSlides(slideIndex += n);
// }

// // Thumbnail image controls
// window.currentSlide = function(n) {
//     showSlides(slideIndex = n);
// }

// window.showSlides = function(n) {
//     let i;
//     let slides = document.getElementsByClassName("mySlides");
//     let dots = document.getElementsByClassName("dot");
//     if (n > slides.length) { slideIndex = 1 }
//     if (n < 1) { slideIndex = slides.length }
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//     }
//     for (i = 0; i < dots.length; i++) {
//         dots[i].className = dots[i].className.replace(" active", "");
//     }
//     slides[slideIndex - 1].style.display = "block";
//     dots[slideIndex - 1].className += " active";
// }

var name = document.getElementById("name");
var email = document.getElementById("email");
var number = document.getElementById("number");
var food = document.getElementById("food");
var address = document.getElementById("addr");

window.addOrder = function() {
    var obj = {
        name: name.value,
        email: email.value,
        number: number.value,
        food: food.value,
        address: address.value,
        // time: dateOfToday.getHours() + ":" + dateOfToday.getMinutes(),
    };
    console.log(obj);

    var reference = ref(databs, "orders/");
    var newRef = push(reference);
    obj.id = newRef.key;
    set(newRef, obj);
    // inp.value = ""
    // ema.value = ""
    // num.value = ""
    // fod.value = ""
    // add.value = ""
};

var orderData;

function getOrder() {
    var reference = ref(databs, "orders/");
    onValue(reference, function(data) {
        orderData = Object.values(data.val());
        console.log(orderData);
    });
}
getOrder();