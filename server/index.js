const express = require('express');
let app = express();
let bodyParser = require('body-parser');
let getReposByUsername = require('../helpers/github.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.post('/repos', function (req, res) {
  // TODO - your code here!
  console.log(req.body.username);
  getReposByUsername.getReposByUsername(req.body.username, function (err, data) {
    if (data) {
      res.send(data);
    } else if (err) {
      res.send(err);
    }
  })
    // .then(data => {
    //   console.log(data);
    // })
    // .catch(err => {
    //   console.log('test');
    // });
  //res.send({});
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

