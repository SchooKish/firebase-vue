import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB34GZRt6xDSfJt3KrxxZrb09jH-cWfPwQ",
    authDomain: "test-36318.firebaseapp.com",
    projectId: "test-36318",
    storageBucket: "test-36318.appspot.com",
    messagingSenderId: "236345615560",
    appId: "1:236345615560:web:fed58f009af63879c2f1fd",
    databaseURL: 'https://test-36318-default-rtdb.europe-west1.firebasedatabase.app/'
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);
export {auth, db};

setPersistence(auth, browserLocalPersistence);

