var express = require('express');
var app = express();
var Yelp = require('yelp')
var path = require('path')
var geocoder = require('geocoder');
var config = require('./config');

var yelp = new Yelp({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  token: config.token,
  token_secret: config.token_secret
});

app.use('/assets', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'index.html'));
})

app.get('/:location/:next_location', (req, res) => {
    
    if (req.params.location != '' && req.params.next_location != '') {
        geocoder.geocode(req.params.location, function ( err, data ) {
            geocoder.geocode(req.params.next_location, function (err, datas) {

                
                var points = {
                    first: data.results[0].geometry.location,
                    second: datas.results[0].geometry.location
                }

                var midX = (points.first.lat + points.second.lat) / 2
                var midY = (points.first.lng + points.second.lng) / 2
                console.log(midX, midY)
                midpoint = {
                    x: midX,
                    y: midY
                }
                yelp.search({ term: 'food', ll: `${midpoint.x}, ${midpoint.y}` })
                    .then(function (data) {
                        res.send(data)
                    })
                    .catch(function (err) {
                    console.error(err);
                    });


            });
                            
        });
    } else {
        console.log('NO LOCATION SENT!')
    }

});

app.listen(3000, () => {
    console.log('Listening on Port 3000')
})