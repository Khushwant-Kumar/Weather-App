const express = require("express");
const https = require("https");
const bparser = require("body-parser");

const app = express();
app.use(bparser.urlencoded({extended:true}));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
    // res.send("server is up and running"); we can only send one res.send() method
});

app.post("/",function(req,res){
    //console.log("post received");
    console.log(req.body.location);

    const query = req.body.location;
    const apiKey = "3ffdaa12de359159f9b45cc8509d2705";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);

            // const object = {
            //     name : "Harry",
            //     favFood : "Emarti"
            // }
            // console.log(JSON.stringify(object));

            const temp = weatherData.main.temp;
            console.log(temp);
            const speed = weatherData.wind.speed;
            console.log(speed);
            const desciption = weatherData.weather[0].description;
            console.log(desciption);
            const icon = weatherData.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

            res.write("<h1>The description is "+desciption+".</h1>");// we can have multiple res.write()
            res.write("<h3>The temperature in the "+ query +" is "+temp+" degree celcius and wind speed is "+speed+" knots.</h3>");
            res.write("<img src = "+ imgurl +">");
            res.send();
        });
    });
});











app.listen(3000,function(){
    console.log("port created at 3000");
});