import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCiSTI86wmLUNovzNgQHNC-Kcl5CfhgLfs",
    authDomain: "challenge-18b20.firebaseapp.com",
    databaseURL: "https://challenge-18b20.firebaseio.com",
    projectId: "challenge-18b20",
    storageBucket: "challenge-18b20.appspot.com",
    messagingSenderId: "181921911461",
    appId: "1:181921911461:web:2d17f1d52e7a91d4a6f34c",
    measurementId: "G-3HBF4MBCGB"
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()  // for the firebase db
const auth = firebase.auth()

export {
    db, auth
}