
// dependencies
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

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

app.get('/weather', async (req, res) => {
    res.send(weatherData);
});

app.post('/weather', [
        //TODO improve regex
        check('date').matches('^\\d{1,2}\\.\\d{1,2}\\.\\d{4}$'),
        check('temp').isNumeric(),
        check('content').isString().isLength({max: 30})
    ],
    async (request, response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(422).json({errors: errors.array()})
    }

    weatherData['date'] = request.body.date;
    weatherData['temp'] = request.body.temp;
    weatherData['content'] = request.body.content;

    response.status(201).send(weatherData);
});

module.exports = app;