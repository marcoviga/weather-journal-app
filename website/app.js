/* Global Variables */
require('dotenv').config();

const appKey = process.env.APPKEY_OPENWEATHER;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
