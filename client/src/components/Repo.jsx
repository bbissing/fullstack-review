import React from 'react';

const Repo = (props) => {
  console.log(props);
  if (props.item === undefined) {
    return (<div></div>);
  } else {
    return (
      <div>
        <ul>
          <li>
            Repo: <a href={props.item.url}>{props.item.name}</a> Owner: {props.item.owner} Watchers: {props.item.watchers}
          </li>
        </ul>
      </div>
    )
  }
}

export default Repo;