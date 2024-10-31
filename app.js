const express= require('express');
const dotenv = require('dotenv');
const connectToDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const indexRoutes = require('./routes/index.routes');

const app = express();
const port = 3000;
dotenv.config();
connectToDB();

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use('/user', userRoutes);
app.use('/', indexRoutes);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.listen(port, function (err, res) {
    if (err) console.log(err);
    else console.log('Server is running on port 3000');
});