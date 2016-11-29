var express = require('express');
var app = express();
var Yelp = require('yelp')
var path = require('path')
var geocoder = require('geocoder');
var config = require('./config');

var yelp = new Yelp({
  consumer_key: config.yelp.consumer_key,
  consumer_secret: config.yelp.consumer_secret,
  token: config.yelp.token,
  token_secret: config.yelp.token_secret
});

app.use('/assets', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'index.html'));
})

app.get('/:location/:next_location', (req, res) => {
    console.log(yelp)
    function geocodePromise(data) {
        return new Promise(function (resolve, reject) {
            geocoder.geocode(data, function (err, data) {
                if (data) { resolve(data) }
            })
        })
    }

    var points = {}
    geocodePromise(req.params.location)
    .then((data) => {
        points.location1 = data.results[0].geometry.location
        return geocodePromise(req.params.next_location)
    })
    .then(data => {
        points.location2 = data.results[0].geometry.location
    })
    .then(data => {
        var midX = (points.location1.lat + points.location2.lat) / 2
        var midY = (points.location1.lng + points.location2.lng) / 2
        return yelp.search({term: 'food', ll: `${midX}, ${midY}`})
    })
    .then(data => { res.send(data) })
    .catch((err) => { res.send(err) })
});

app.listen(3000, () => {
    console.log('Listening on Port 3000')
})