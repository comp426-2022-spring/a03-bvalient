//require express.js
const express = require('express')
const app = express()

//start an app server
const server = app.listen(HTTP_PORT, () =>{
    console.log('App Listening on port %PORT%'.replace('%PORT%', HTTP_PORT))
});

//default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});
