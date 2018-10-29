import React from 'react';

export class Name extends React.Component {
  render() {
    let {
      props: {
        onClick,
        name
      }
    } = this;
    return (
      <p onClick={onClick}>
        Name: { name }
      </p>
    )
  }
}

export class NameInput extends React.Component {
  render() {
    let {
      props: {
        onChange,
        onClickSave,
        onClickCancel
      }
    } = this;
    return (
      <div>
        <input onChange={onChange}></input>
        <button onClick={onClickSave}>Save</button>
        <button onClick={onClickCancel}>Cancel</button>
      </div>
    )
  }
}
