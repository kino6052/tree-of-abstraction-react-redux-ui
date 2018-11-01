import React from 'react';

export class AddButton extends React.Component {
  render(){
    let {
      props: {
        onClick
      }
    } = this;
    return (
      <div className={'Add'} key="add" onClick={ () => {console.log('click')} }>
        <a // eslint-disable-line jsx-a11y/anchor-is-valid
          onClick={ onClick }
        >
          Add child
        </a>
      </div>
    )
  }
}
