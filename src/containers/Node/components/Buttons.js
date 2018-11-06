import React from 'react';

export class AddButton extends React.Component {
  render(){
    let {
      props: {
        onClick
      }
    } = this;
    return (
      <div className={'Add'} key="add">
        <a // eslint-disable-line jsx-a11y/anchor-is-valid
          onClick={ onClick }
        >
          Add
        </a>
      </div>
    )
  }
}

export class EditButton extends React.Component {
  render(){
    let {
      props: {
        onClick
      }
    } = this;
    return (
      <div className={'Edit'} key="add">
        <a // eslint-disable-line jsx-a11y/anchor-is-valid
          onClick={ onClick }
        >
          Edit
        </a>
      </div>
    )
  }
}

export class RemoveButton extends React.Component {
  render(){
    let {
      props: {
        onClick
      }
    } = this;
    return (
      <div className={'Remove'} key="remove">
        <a // eslint-disable-line jsx-a11y/anchor-is-valid
          onClick={ onClick }
        >
          Remove
        </a>
      </div>
    )
  }
}
