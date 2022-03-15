const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const fileupload = require('express-fileupload');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
const utils = require('./test/task-schema.js');

// Route files
const patient = require('./routes/patient');
const visitlog = require('./routes/visitlog');
const auth = require('./routes/auth');
const lab = require('./routes/lab');
const Patients = require('./models/Patients');

// Load env vars
dotenv.config({path: './config/config.env'});

// Connect to database
connectDB();

const app = express();

// Body Parser
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

//Dev logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// File Uploading
app.use(fileupload());

// Set statics folder
//app.use(express.static(path.join(__dirname,'Public')));

// Mount routers
app.use('/api/v1/patient', patient);
app.use('/api/v1/visitlog', visitlog);
app.use('/api/v1/auth', auth);
app.use('/api/v1/lab', lab);
app.get('/', (req, res) => {
    res.json({status: 'Done', message: "Welcome Prof. Abrar"});
});

//Testing purpose
const tasks = [
    {
        id: 1,
        name: "test 1",
        completed: "false"
    },
    {
        id: 2,
        name: "test 2",
        completed: "false"
    },
    {
        id: 3,
        name: "test 3",
        completed: "false"
    }
];
app.get("/api/v1/tests", (req, res) => {
    res.send(tasks);
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT, console.log
    ('Server running in ' + process.env.NODE_ENV +  'mode on port '+ PORT));

// Handle unhanled rejections
process.on('unhandledRejection', (err, promise) => {
    console.log('Error: ' + err.message);
    // Close server & exit process
    server.close(() => process.exit(1));
});

module.exports = server;


