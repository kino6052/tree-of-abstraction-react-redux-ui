import React from 'react';

export class Link extends React.Component {
  render(){
    let {
      props: {
        collapsed,
        parentId,
        onClick
      }
    } = this;
    return (
      <a className={'Link'} onClick={onClick} style={{ color: 'lightgray', textDecoration: 'none' }}>
          { collapsed ? '|' : '_' }
      </a>
    )
  }
}
