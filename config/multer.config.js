const { credential } = require('firebase-admin')
const multer = require('multer')
const firebaseStorage = require('multer-firebase-storage')
const serviceAccount = require('../mendriveproject-firebase-adminsdk-fe8cs-bd151c94fa.json');
const firebase = require('./firebase.config');

const firebaseConfig = firebaseStorage({
    credentials: firebase.credential.cert(
        serviceAccount),
    bucketName : 'mendriveproject.appspot.com',
    unique: true,
})

const upload = multer({
    storage: firebaseConfig,
})

module.exports = upload;