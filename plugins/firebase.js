import firebase from "firebase/app"

if (!firebase.apps.length) {
    firebase.initializeApp(
        {
            apiKey: "AIzaSyBU34aDZQZM2qUk2auFE_6oYPRIwGtgeNw",
            authDomain: "player-dad55.firebaseapp.com",
            projectId: "player-dad55",
            storageBucket: "player-dad55.appspot.com",
            messagingSenderId: "247811668640",
            appId: "1:247811668640:web:ea548d3212b79f1dbf27c5",
            measurementId: "G-RPB1W5PQ34"
        }
    )
}
export default firebase
