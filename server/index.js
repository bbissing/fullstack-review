const express = require('express');
let app = express();
let bodyParser = require('body-parser');
let getReposByUsername = require('../helpers/github.js');
let db = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('post req.body', req.body);
  getReposByUsername.getReposByUsername(req.body.username, function (err, success) {
    if (err) {
      res.send(err);
    } else {
      var data = JSON.parse(success.body);
      var repoMap = data.map(repo => db.save(repo));
      Promise.all(repoMap)
        .then(res.send('user\'s repos were successfully sent to the database'))
        .catch(err => res.send(err));
      }
    })

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.get()
    .then(docs => res.send(docs))
    .catch(err => res.send(err));
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});



      //alternative approach for post
      // for (var i = 0; i < data.length; i++) {
      //   db.save(data[i])
      //   // db.save(data[i], function(err, success) {
      //   //   if (success) {
      //   //   console.log('post - success');
      //   //     if (i === data.length - 1) {
      //   //       res.send('user\'s repos were successfully sent to the database');
      //   //     }
      //   //   } else {
      //   //     res.send(err);
      //   //   }
      //   // })
      // }


      //alternative approach for get
        // db.get(function(err, success) {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     console.log('app get server data', success);
  //     res.send(success);
  //   }
  // })