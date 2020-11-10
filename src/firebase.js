 
import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyA0b7YElZCPbLZ566H7i8ALGO5HokdtQ0U",
    authDomain: "phonebook-90cd9.firebaseapp.com",
    databaseURL: "https://phonebook-90cd9.firebaseio.com",
    projectId: "phonebook-90cd9",
    storageBucket: "phonebook-90cd9.appspot.com",
    messagingSenderId: "237724699417",
    appId: "1:237724699417:web:7f68600384b0c36642d388"
  };

firebase.initializeApp(firebaseConfig);
export default firebase;