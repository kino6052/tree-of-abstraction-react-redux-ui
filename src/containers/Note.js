import React from 'react';
import { connect } from 'react-redux';

export class Note extends React.Component {
  render() {
    let {
      props: {
        notes = []
      } = {}
    } = this;
    debugger;
    return (
      <div className={'Note'}>
        <h1> Note </h1>
        { notes.map(
          (note) => {
            let {
              title,
              content
            } = note;
            return (
              <div>
                <b>{title}</b>
                <p>{content}</p>
              </div>
            );
          }
        ) }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let {
    notes = []
  } = state;
  return { notes };
}

export default connect(mapStateToProps)(Note)
