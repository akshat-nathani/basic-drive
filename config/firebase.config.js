// firebase.config.js
const Firebase = require('firebase-admin');
const serviceAccount = require('../mendriveproject-firebase-adminsdk-fe8cs-d37eae78fb.json');

const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket: 'mendriveproject.appspot.com',
});

module.exports = firebase;
