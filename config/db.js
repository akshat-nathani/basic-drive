const mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.log('Error connecting to MongoDB', err);
        });
}

module.exports = connectToDB;