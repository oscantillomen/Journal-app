import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyAsk8qMAighSU9XBxwVFwG_9m2Shk9RJUk",
    authDomain: "react-app-cursos-903f1.firebaseapp.com",
    databaseURL: "https://react-app-cursos-903f1.firebaseio.com",
    projectId: "react-app-cursos-903f1",
    storageBucket: "react-app-cursos-903f1.appspot.com",
    messagingSenderId: "769486441105",
    appId: "1:769486441105:web:72e0b2dc537c2e6df8cd30"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }