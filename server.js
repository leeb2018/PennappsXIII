var express = require('express');

var app = express();

app.get('/', function(request, response) {
    response.send("this is working!");
})

app.listen(6789, function() {
    console.log("Listening to 6789");
})