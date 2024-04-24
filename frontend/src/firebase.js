// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'talha-s-blog.firebaseapp.com',
  projectId: 'talha-s-blog',
  storageBucket: 'talha-s-blog.appspot.com',
  messagingSenderId: '758523186960',
  appId: '1:758523186960:web:854bec4848e050171a1f95',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
