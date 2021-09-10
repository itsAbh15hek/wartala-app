import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const config = {
  apiKey: 'AIzaSyB10HpW5DDzzm9k9Btjm1oB7ufGwbAJ1bs',
  authDomain: 'wartala-app.firebaseapp.com',
  databaseURL:
    'https://wartala-app-default-rtdb.asia-southeast1.firebasedatabase.app/',
  projectId: 'wartala-app',
  storageBucket: 'wartala-app.appspot.com',
  messagingSenderId: '4598573577',
  appId: '1:4598573577:web:3fa41830d490357a6526d8',
};

// Initialize Firebase
const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
