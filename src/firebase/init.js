//<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js"></script>

import firebase from 'firebase'



 const firebaseConfig = {
    apiKey: "AIzaSyCcfe7e-U_T0-nQMp9nGyIxfdqKfCyZ77A",
    authDomain: "vuejs-7ced8.firebaseapp.com",
    databaseURL: "https://vuejs-7ced8-default-rtdb.firebaseio.com",
    projectId: "vuejs-7ced8",
    storageBucket: "vuejs-7ced8.appspot.com",
    messagingSenderId: "278962505560",
    appId: "1:278962505560:web:dc3687efe5ff81a680872d",
    measurementId: "G-8TG5D2MWHX"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebaseApp.firestore().settings({timestampsInSnapshots: true});

  export default firebaseApp.firestore();




