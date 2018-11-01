import React from 'react';

export class Name extends React.Component {
  render() {
    let {
      props: {
        onClick,
        title
      }
    } = this;
    return (
      <p className={'Title'} onClick={onClick}>
        { typeof title === 'string' && title !== '' ? title : '...' }
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
