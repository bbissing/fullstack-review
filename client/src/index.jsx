import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Repo from './components/Repo.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    //this.setState({user: term});
    // TODO
    $.ajax({
      url: 'http://localhost:1128/repos',
      type: "POST",
      contentType: 'application/json',
      data: JSON.stringify({username: term}),
      success: (message) => {
        console.log('search button clicked:', message);
        this.retrieve(term);
      },
      error: function(err) { console.log(err); }
    })
      //.then(message => {this.retrieve(term)});


  }

  retrieve () {
    console.log('retrieve has been called');

    $.ajax({
      url: 'http://localhost:1128/repos',
      type: "GET",
      contentType: 'application/json',
      success: (data) => {
        console.log('retrieved data', data);
        this.setState({repos: data});
      },
      error: function(err) { console.log(err) }
    });
  }

  componentDidMount() {
    this.retrieve();
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      <Repo refresh={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));