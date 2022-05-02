//require express.js
const express = require('express')
const app = express()

const { get } = require('http')

const args = require('minimist')(process.argv.slice(2))
args["port"]
const port = args.port || process.env.port || 5000

//start an app server
const server = app.listen(port, () =>{
    console.log('App Listening on port %PORT%'.replace('%PORT%', port))
});

//default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

//functions
function coinFlip() {
    if(Math.random() > .5){
      return "tails"
    } else {
      return "heads"
    }
  }

  function coinFlips(flips) {
    let returnable = [];
    for(let i = 0; i < flips; i++){
      returnable.push(coinFlip());
    } 
    return returnable;
  }

  function countFlips(array) {
    let heads = 0;
    let tails = 0;
    for(let i = 0; i < array.length; i++){
      if (array[i] == "heads"){
        heads += 1;
      } else {
        tails += 1
      }
    }
    return "{ heads: " + heads + ", tails: " + tails + " }"
  }

  function flipACoin(call) {
    let er_mes = "Error: no input." + "\n"
    let fix_mes = "Usage: node guess-flip --call=[heads|tails]"
    if(call != "heads" && call != "tails"){
      return er_mes + fix_mes
    }
    let theFlip = coinFlip();
    let resultW = "win"
    let resultsL = "lose"
    if(theFlip == call){
      return "{ call: " + call + ", flip: " + theFlip + ", result: " + resultW + " }"
    } else {
      return "{ call: " + call + ", flip: " + theFlip + ", result: " + resultsL + " }"
    }
  }

app.get('/app/', (req, res) => {
    //status 200
    res.statusCode = 200;
    // status message "OK"
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain'});
    res.end(res.statusCode + ' ' + res.statusMessage)
});

app.get('/app/flip/', (req, res) => {
    res.statusCode = 200
    const json = { "flip" : coinFlip() }
    res.status(res.statusCode)
    res.setHeader('Content-Type', 'application/json')
    res.json(json)
    
});

    app.get('/app/flip/call/heads', (req, res) =>{
    res.status(200).send(flipACoin('heads'))
});

app.get('/app/flip/call/tails', (req, res) =>{
    res.status(200).send(flipACoin('tails'))
});

app.get('/app/flips/:number', (req, res) => {
    const flips = coinFlips(req.params.number)
    res.status(200).json({'raw' : flips, 'summary' : countFlips(flips)})
});