const express = require("express");
const bodyParser = require("body-parser");
const fetch = require('node-fetch-npm');
const Request = require("request");

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

var countriesRequest = fetch('https://corona.lmao.ninja/v2/countries').then(function(response){ 
    return response.json()
});
var globalRequest = fetch('https://corona.lmao.ninja/v2/all').then(function(response){
    return response.json()
});

var combinedData = {"countriesRequest":{},"globalRequest":{}};
Promise.all([countriesRequest,globalRequest]).then(function(values){
    combinedData["countriesRequest"] = values[0];
    combinedData["globalRequest"] = values[1];
    return combinedData;
    
});

app.get("/", function(req,res) {   
    res.render("base", {
      AllData: combinedData
    });
});


let port = process.env.PORT;
if(port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server has started Successfully");
});
