require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2];
var value = process.argv[3];

switch (action) {
case "spotify-this":
spotifyThis();
break;
case "st":
spotifyThis();
break;
case "movie":
movie();
break;
}

function movie() {
var movieName = value;
// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

request(queryUrl, function(error, response, body) {

// If the request is successful
if (!error && response.statusCode === 200) {

// Parse the body of the site and recover just the imdbRating
// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
console.log("Title is: " + JSON.parse(body).Title);
console.log("Release Year: " + JSON.parse(body).Year);
}
});
}