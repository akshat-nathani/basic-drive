const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');
const fileModel = require('../models/files.model');
const authMiddleware = require('../middleware/auth');
const firebase = require('../config/firebase.config');

router.get('/home', authMiddleware, async (req, res) => {
    try {
        const userFiles = await fileModel.find({
            user: req.user.id  // Changed from userId to id based on your JWT token
        });
        res.render('home', {
            files: userFiles
        });
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ message: 'Error fetching files' });
    }
});

router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        console.log('File details:', req.file); // Debug log
        console.log('User details:', req.user); // Debug log

        const newFile = await fileModel.create({
            name: req.file.filename, // If you're generating a unique filename
            originalName: req.file.originalname,
            path: req.file.path,
            user: req.user.id, // Changed from _id to id based on your JWT token
            size: req.file.size,
            mimeType: req.file.mimetype
        });

        res.json({
            message: 'File uploaded successfully',
            file: newFile
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ 
            message: 'Error uploading file',
            error: error.message 
        });
    }
});

router.get('/download/:path', authMiddleware, async (req, res) => {
    try {
        const loggedInUser = req.user.id;  // Changed from userId to id
        const path = req.params.path;
        
        const file = await fileModel.findOne({
            user: loggedInUser,
            path: path
        });

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        const signed = await firebase.storage()
            .bucket()
            .file(path)
            .getSignedUrl({
                action: 'read',
                expires: Date.now() + 3600 * 1000
            });

        res.redirect(signed[0]);
    } catch (error) {
        console.error('Download error:', error);
        res.status(500).json({ 
            message: 'Error downloading file',
            error: error.message 
        });
    }
});

module.exports = router;