function coinFlip() {
    return Math.random() > 0.5 ? 'heads' : 'tails'
}

function coinFlips(flips) {
    const result = []
    for(let i = 0; i < flips; i++){
      result[i] = coinFlip()
    }
    return result
}

function countFlips(array) {
    let head = 0
    let tail = 0
    array.forEach(element => {
      if(element == "heads") head++
      else tail++
    });
    if (head == 0) {
      return {'tails': tail}
    } else if (tail == 0) {
      return {'heads': head}
    } else {
      return {'heads': head, 'tails': tail}
    }
}


function flipACoin(call) {
    let flip = coinFlip()
    const result = ""
    if(call == flip) return {call: call, flip: flip, result: 'win'}
    else return {call: call, flip: flip, result: 'lose'}
}

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