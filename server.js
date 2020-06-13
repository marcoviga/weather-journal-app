// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// dependencies
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

// express app creation
const port = process.env.PORT || 3000;
const app = express();

// express configurations
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('website'));

// Setup Server
app.listen(port, () => {
    console.log(`express started on http://localhost:${port}`);
});


