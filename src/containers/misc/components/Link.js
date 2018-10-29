import React from 'react';

export class Link extends React.Component {
  render(){
    let {
      props: {
        parentId,
        onClick
      }
    } = this;
    return (
      typeof parentId !== 'undefined' &&
      <a href="#" onClick={onClick} style={{ color: 'lightgray', textDecoration: 'none' }}>
        ×
      </a>
    )
  }
}
