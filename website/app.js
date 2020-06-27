// const dotenv = require('dotenv');
// dotenv.config();
//TODO need to do it with webpack

const apiKey = "something bla";

const baseUri = 'http://api.openweathermap.org/data/2.5/weather?';
const countryCode = 'us';
const weatherAppUri = 'http://localhost:3000/weather';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

document.querySelector('#generate').addEventListener('click', runWeather);

function runWeather() {
    const zip = document.querySelector('#zip').value;
    const feelings = document.querySelector('#feelings').value;
    const dateToday = getDate();

    const apiUri = `${baseUri}zip=${zip},${countryCode}&appid=${apiKey}`;
    console.log(apiUri);

    fetch(apiUri)
        .then(response => response.json())
        .then(weather => postWeather(weather, feelings, dateToday))
        .catch(alert);
}

function postWeather(weather, feelings, dateToday) {
    fetch(weatherAppUri, {
        method: 'post',
        body: JSON.stringify({
            date: dateToday,
            temperature: weather.main.temp,
            content: feelings
        })
    })
}

function getDate() {
    let d = new Date();
    return d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
}
