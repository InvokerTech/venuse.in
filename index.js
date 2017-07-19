var express = require('express');
var app = express();
//var fs =require('fs');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
//app.use("/fonts", express.static(__dirname + '/fonts'));
app.use("/app", express.static(__dirname + '/public/app'));

// views is directory for all template files
app.set('views', __dirname + '/public');
app.set('view engine', 'html');

app.get('/*', function(request, res) {
    res.sendFile(__dirname + '/public/index.html');
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


