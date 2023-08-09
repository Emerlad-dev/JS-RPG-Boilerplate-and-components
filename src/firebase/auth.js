// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGAecZi8RmCGTIx2oUER6So_Kv-Iu9otI",
  authDomain: "rpg-multiplayer-e7254.firebaseapp.com",
  databaseURL: "https://rpg-multiplayer-e7254-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rpg-multiplayer-e7254",
  storageBucket: "rpg-multiplayer-e7254.appspot.com",
  messagingSenderId: "1058931066192",    
  appId: "1:1058931066192:web:ff116c7c01cf0122c65855",
  measurementId: "G-1DK7643TSZ"
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
let db = getDatabase();
//auth

const auth = getAuth();
const signupForm = document.querySelector(".signup")
function signupFormFilled() {
  const password = signupForm.password.value
  const email = signupForm.email.value
  createUserWithEmailAndPassword(auth, email, password).then((cred) => {
    console.log("user created:", cred.user);
    signupForm.requestFullscreen;
  })
    .catch((err) => {
      console.log(err)
    })
};

//onclick events
var SignupButton = document.querySelector(".SignupButton")
SignupButton.addEventListener("click", signupFormFilled)

var signoutButton = document.querySelector(".SignoutButton")
signoutButton.addEventListener("click", () => {
  signOut(auth).then(() => {
    console.log("signed out")
  })
});
let userId;
let userRef;
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    userId = user.uid;
    userRef = ref(db, "players/" + userId);
    set (userRef , {
      uid: userId
    })
    console.log(userId)
    // ...
  } else {
    // User is signed out
    // ...
  }
})

