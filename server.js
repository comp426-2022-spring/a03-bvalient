//require express.js
const express = require('express')
const app = express()

//start an app server
const server = app.listen(HTTP_PORT, () =>{
    console.log('App Listening on port %PORT%'.replace('%PORT%', HTTP_PORT))
});

