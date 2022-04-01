const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const fileupload = require('express-fileupload');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
const schema = require('./test/task-schema.js');

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
    res.json({status: 'Done', message: "Big Welcome Prof. Abrar"});
});

//////////////////////////////////      Testing purpose ////////////////////////////////////
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

// GET (BY ID)
app.get("/api/v1/tests/:id" , (req, res) => {
    const testID = req.params.id;
    const task = tasks.find(task => task.id === parseInt(testID));
    if(!task) return res.status(404).send("The task with the provided ID does not exist.");
    res.send(task);
});


// POST
app.post("/api/v1/tests", (req, res) => {
    const validation = schema.validate(req.body);

    if(!validation) 
    return res.status(400).send("The name should be at least 3 chars long!")

    const task = {
        id: tasks.length + 1,
        name: req.body.name,
        completed: req.body.completed
    };

    tasks.push(task);
    res.status(201).send(task);
});



//////////////////////////////////// END TESTING //////////////////////////////////////////

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


