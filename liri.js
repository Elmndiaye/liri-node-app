require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var fs = require('file-system');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2];
var value = process.argv[3];

switch (action) {
case "song":
song();
break;
case "movie-this":
movies();
break;
case "do-what-it-says":
does();
break;
};

function movies() {
var movieName = value;

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

// console.log(queryUrl);

request(queryUrl, function(error, response, body) {

if (!error && response.statusCode === 200) {

console.log("Title is: " + JSON.parse(body).Title);
console.log("Release Year: " + JSON.parse(body).Year);
console.log("imdbRating: " + JSON.parse(body).Ratings[0].Value);
console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
console.log("Country where the movie was produced: " + JSON.parse(body).Country);
console.log("Plot of the movie: " + JSON.parse(body).Plot);
console.log("Actors in the movie: " + JSON.parse(body).Actors);

}
});
}

function song() {

    spotify.search({ type: 'track', query: value }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
    //   console.log(data.tracks.items[0]); 

      console.log("\nYAY!! You searched for a song! We love music!!" + 
                  "\nThe artist's name is " + data.tracks.items[0].artists[0].name +
                  "\nThe songs's name is " + data.tracks.items[0].name +
                  "\nSee the album at " + data.tracks.items[0].album.external_urls.spotify +
                  "\nThe Album's name is " + data.tracks.items[0].album.name);
      });

}

function tweetz(){
    var params = {screen_name: 'the_gripster'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        // console.log(tweets[0]);
          for(var i = 0; i < 20; i++) {
            console.log(tweets[i].text);
            console.log("Tweeted at: " + tweets[i].created_at);
            console.log("-----------------");
          }
        
      }
    });    
}
function does (){
    fs.readFile("do-what-it-says", "utf8", function(error, data) {

        if (error) {
            return console.log(error);
        }
        console.log(data);

        var dataArr = data.split(",");
    
        console.log(dataArr);
    
    });

}
