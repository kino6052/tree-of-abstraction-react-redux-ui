import React from 'react';

export class AddButton extends React.Component {
  render(){
    let {
      onClick
    } = this;
    return (
      <li key="add">
        <a href="#" // eslint-disable-line jsx-a11y/anchor-is-valid
          onClick={onClick}
        >
          Add child
        </a>
      </li>
    )
  }
}
