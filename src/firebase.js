import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyBWLckbK32BBaMLjtT8FMzfrU2Lxzl2_Pg",
    authDomain: "bi122jrle234-21.firebaseapp.com",
    databaseURL: "https://bi122jrle234-21-default-rtdb.firebaseio.com",
    projectId: "bi122jrle234-21",
    storageBucket: "bi122jrle234-21.appspot.com",
    messagingSenderId: "207012439129",
    appId: "1:207012439129:web:d0c2100be29f7a0f363d48"
};

firebase.initializeApp(firebaseConfig);

export default firebase;