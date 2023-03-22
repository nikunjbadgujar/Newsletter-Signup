//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require ("https");
const { url } = require("inspector");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,   
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }

        ]
    };

    var jsonData = JSON.stringify(data);

   const url = "https://us21.api.mailchimp.com/3.0/lists/04297ab1bc";

    const Option = {
       method:"POST",  
       auth:"Nikunj1:5f627f3f9adc4d7cf7c9872b06838b81-us21"
    }

   const request = https.request(url,Option,function(response){

    if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
    } else {
        res.sendFile(__dirname + "/failure.html");
    }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/")
})

app.listen( process.env.PORT || 3009, function(){
    console.log("Server is running  on port 3009");
});
//API key
//4943c73bb8578e8e8fc7d36631c8be5c-us21

//list id 
// 04297ab1bc.