import MyFirebase from "firebase/compat/app";
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCpGJC_Aci__ngtMjgqpslD_l-u1Unc9wI",
  authDomain: "contact-app-e5eef.firebaseapp.com",
  projectId: "contact-app-e5eef",
  storageBucket: "contact-app-e5eef.firebasestorage.app",
  messagingSenderId: "162368148799",
  appId: "1:162368148799:web:3fcc7d788fdef3d3936f8a"
};

// Initialize Firebase
 const app = MyFirebase.initializeApp(firebaseConfig);
export const database = MyFirebase.firestore()