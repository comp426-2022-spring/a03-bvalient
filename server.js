//require express.js
const express = require('express')
const app = express()
const args = minimist(process.argv.slice(2));
const port = args.port || process.env.PORT || 5000

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });

app.get('/app/flip/', (req, res) => {
    res.statusCode = 200
    const json = { "flip" : coinFlip() }
    res.status(res.statusCode)
    res.setHeader('Content-Type', 'application/json')
    res.json(json)
    
});

app.get('/app/flips/:number', (req, res) => {
    res.statusCode = 200
    const raw = coinFlips(req.params.number || 1)
    const summary = countFlips(raw)
    const json = {
        "raw": raw,
        "summary": summary
    }
    res.setHeader('Content-Type', 'application/json')
    res.json(json)
})

app.get('/app/flip/call/:call', (req, res) => {
    res.statusCode = 200
    const json = flipACoin(req.params.call)
    res.setHeader('Content-Type', 'application/json')
    res.json(json)
})
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

const server = app.listen(port, () => {
        console.log('App listening on port %PORT%'.replace('%PORT%',port))
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
