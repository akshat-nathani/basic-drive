// multer.config.js
const firebase = require('./firebase.config');
const multer = require('multer');
const firebaseStorage = require('multer-firebase-storage');

const firebaseConfig = firebaseStorage({
    credentials: firebase.options.credential, // Access the credential from the initialized firebase app
    bucketName: firebase.options.storageBucket,
    unique: true,
});

const upload = multer({
    storage: firebaseConfig,
});

module.exports = upload;
