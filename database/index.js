const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true, useUnifiedTopology: true });

let repoSchema = mongoose.Schema({
  repoId: Number,
  name: String,
  owner: String,
  url: String,
  watchers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let get = () => {
  return Repo.find({})
    .then((docs) => {
      var sortedDocs = docs.sort((a, b) => b.watchers - a.watchers);
      var top25 = sortedDocs.slice(0, 25);
      console.log('repo find docs', top25);
      return top25;
    })
    .catch(err => { return err; });
}


let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  let repo = new Repo({
    repoId: data.id,
    name: data.name,
    owner: data.owner.login,
    url: data.html_url,
    watchers: data.watchers
  });


  Repo.find({ repoId: repo.repoId })
    .then(doc => {
      if (doc.length === 0) {
        return repo.save();
      }
    })
}

module.exports.save = save;
module.exports.get = get;