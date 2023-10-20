// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD739_uhqMNc_Hs0mhaSOi26GG6DGg5QZo',
  authDomain: 'react-project-disneyplusapp2.firebaseapp.com',
  projectId: 'react-project-disneyplusapp2',
  storageBucket: 'react-project-disneyplusapp2.appspot.com',
  messagingSenderId: '64947197560',
  appId: '1:64947197560:web:4a78a5bdd533cee7187f8d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
