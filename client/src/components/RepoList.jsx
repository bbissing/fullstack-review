import React from 'react';
import Repo from './Repo.jsx';

const RepoList = (props) => {
  return(
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
      {props.repos.map(repo =>
        <Repo item={repo} key={repo.repoId}/>
      )}
    </div>
  )
}

export default RepoList;