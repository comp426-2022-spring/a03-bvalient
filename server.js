//require express.js
const express = require('express')
const app = express()

const {get} = require('http')

const args = require('minimist')(process.argv.slice(2))
args["port"]
const port = args.port || process.env.port || 5000

//start an app server
const server = app.listen(HTTP_PORT, () =>{
    console.log('App Listening on port %PORT%'.replace('%PORT%', HTTP_PORT))
});

//default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});



app.get('/app/', (req, res) => {
    //status 200
    res.statusCode = 200;
    // status message "OK"
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain'});
    res.end( res.statusCode + ' ' + res.statusMessage)
});