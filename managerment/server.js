var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/hello', (req, res) =>
{
    res.send({message: 'Hello Express! '});

});

app.listen(port, () => console.log('Listening on port'));