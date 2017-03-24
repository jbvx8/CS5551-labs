
var express = require('express');
var app = express();
var request = require('request');
var cors = require('cors');
app.use(cors({origin: 'http://localhost:63342'}));


app.get('/getPlace', function (req, res) {
    var result={
        'city': []
    };

    var location = req.query.city;
    var state = req.query.state;
    var url = "http://api.wunderground.com/api/df9758940cfd75a7/conditions/q/" + state + "/" + location + ".json";

    request(url, function (error, response, body) {
        //Check for error
        if (error) {
            return console.log('Error:', error);
        }

        //Check for right status code
        if (response.statusCode !== 200) {
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
        //All is good. Print the body
        body = JSON.parse(body);
        var weather = body.current_observation;
        //for (var i = 0; i < weather.length; i++) {
            result.city.push({
                'time': weather.observation_time,
                'weather': weather.weather,
                'temperature': weather.temperature_string,
                'humidity': weather.relative_humidity,
                'wind': weather.wind_string
            });
        //}
    });
    var moodUrl = "http://www.emotionalcities.com/api/getCityMood/" + location + "/2017-03-22/23";
    request(moodUrl, function(error, response, body) {
        //Check for error
        if (error) {
            return console.log('Error:', error);
        }

        //Check for right status code
        if (response.statusCode !== 200) {
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
        //All is good. Print the body
        var DOMParser = require('xmldom').DOMParser;
        var parser = new DOMParser();
        body = parser.parseFromString(body, "body/xml");
        var mood = body.getElementsByTagName("value")[0].childNodes[0].nodeValue;
        var moodDescription;
        if (mood == 0) {
            moodDescription = "angry";
        } else if (mood == 1) {
            moodDescription = "sad";
        } else if (mood == 2) {
            moodDescription = "mad";
        } else if (mood == 3) {
            moodDescription = "sick";
        } else if (mood == 4) {
            moodDescription = "neutral";
        } else if (mood == 5) {
            moodDescription = "happy";
        } else if (mood == 6) {
            moodDescription = "excited";
        } else if (mood == 7) {
            moodDescription = "cheerful";
        }
        result.city[0].mood = moodDescription;

        res.contentType('application/json');
        res.write(JSON.stringify(result));
        res.end();
        console.log(result);
    });

    console.log(result);


});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})