const Firebase = require('firebase-admin');
const serviceAccount = require('../mendriveproject-firebase-adminsdk-fe8cs-bd151c94fa.json');
const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(
        serviceAccount),
    storageBucket: 'mendriveproject.appspot.com',
});
module.exports = Firebase;