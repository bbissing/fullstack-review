const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true, useUnifiedTopology: true });

let repoSchema = mongoose.Schema({
  repoId: Number,
  name: String,
  owner: String,
  watchers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  let repo = new Repo({
    repoId: data.id,
    name: data.name,
    owner: data.owner.login,
    watchers: data.watchers
  });

  // Repo.deleteMany({})
  // .then(count => { callback(null, count); })
  // .catch(err => { callback(err); });


  Repo.find({ repoId: data.id })
    .then(doc => {
      if (doc.length === 0) {
        repo.save();
        callback(null, 'success');
      }
    })
    .catch(err => { callback(err); });

}

module.exports.save = save;