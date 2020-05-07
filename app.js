const express = require("express");
const bodyParser = require("body-parser");
var Request = require("request");

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res) {
        
        Request("https://api.covid19api.com/summary", function (error, response, body) {
        
            const data = JSON.parse(body);
            const globalData = data.Global;
            const countries = data.Countries;
            res.render("index", {
                GlobalData: globalData,
                Countries: countries
            });
        });
});

app.listen(3000, function(){
    console.log("Server started");
});
