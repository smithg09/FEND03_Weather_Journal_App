// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser')

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('public'));

// Setup Server
const port = 3000;

/* Spin up the server*/
const server = app.listen(port, listening);

// Callback listening(req, res)
function listening() {
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};

/*
    @Routes : GET  , POST.
*/

// GET route
app.get('/allDetials', (req, res) => {
    // GET Route Handler
    res.send(projectData);
    console.log(projectData);    
});


// POST route
app.post('/addWeatherDetails', (req, res) => {
    projectData['date'] = req.body.date;
    projectData['temperature'] = req.body.temp;
    projectData['content'] = req.body.content;
    console.log(projectData);
    res.send(projectData);
});