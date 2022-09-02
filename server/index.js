const express = require('express');
let app = express();
let bodyParser = require('body-parser');
let getReposByUsername = require('../helpers/github.js');
let saveToDatabase = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.post('/repos', function (req, res) {
  // TODO - your code here!
  getReposByUsername.getReposByUsername(req.body.username, function (err, success) {
    if (success) {
      var data = JSON.parse(success.body);
      //console.log(data);
      for (var i = 0; i < data.length; i++) {
        //console.log('data', data[i]);
        saveToDatabase.save(data[i], function(err, success) {
          console.log(success);
        })
      }
    } else if (err) {
      res.send(err);
    }
  })
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

