import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyBrnQ1aPl0G9H_NhsAD3gWnsmMDW_LDtMw",
    authDomain: "test-f7380.firebaseapp.com",
    databaseURL: "https://test-f7380.firebaseio.com",
    projectId: "test-f7380",
    storageBucket: "test-f7380.appspot.com",
    messagingSenderId: "136627999162"
  };
  firebase.initializeApp(config);

  export default firebase;