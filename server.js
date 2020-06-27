
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

let weatherData = {};

app.get('/weather', getWeatherData);

function getWeatherData(req, res) {
    res.send(weatherData);
}

app.post('/weather', addWeatherData);

function addWeatherData(request, response) {
    weatherData['date'] = request.body.date;
    weatherData['temperature'] = request.body.temperature;
    weatherData['content'] = request.body.content;

    response.send(weatherData);
}

app.get('/bob', (req, res) => {
    res.send('ok')
});

module.exports = app;
