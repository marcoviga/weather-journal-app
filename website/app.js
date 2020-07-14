
const apiKey = "c69d778ca16a02677c0058af5c9e9a66";  //TODO for api key use config
const baseUri = 'http://api.openweathermap.org/data/2.5/weather?';
const countryCode = 'us';
const weatherAppUri = 'http://localhost:3000/weather';

document.querySelector('#generate').addEventListener('click', runWeather);

async function runWeather() {
    const zip = document.querySelector('#zip').value;
    const feelings = document.querySelector('#feelings').value;
    const dateToday = getDate();

    const apiUri = `${baseUri}zip=${zip},${countryCode}&appid=${apiKey}`;

    fetch(apiUri)
        .then(response => response.json())
        .then(weather => postWeather(weatherAppUri, JSON.stringify({
            date: dateToday,
            temp: weather.main.temp,
            content: feelings
        })))
        .then(() => addToUI())
        .catch(error => console.log(error))

}

async function postWeather(weatherAppUri, payload) {
    fetch(weatherAppUri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: payload
    }).then(function(res){
            return res;
    });
}

async function addToUI() {
    fetch(weatherAppUri)
        .then(response => response.json())
        .then( entry => {
            document.querySelector('#date').innerHTML = `Date: ${entry.date}`;
            document.querySelector('#temp').innerHTML = `Temperature: ${entry.temp} °F`;
            document.querySelector('#content').innerHTML = entry.content;
        })
}

function getDate() {
    let d = new Date();
    return d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
}