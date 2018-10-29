import React from 'react';

export class Note extends React.Component {
  render() {
    return (
      <div style={{ position: 'fixed', bottom: 0, width: '100%', height: 200, backgroundColor: 'white', borderTop: '1px solid black' }}>
        <h1> Note </h1>
        <p>Text information contained in a note</p>
      </div>
    )
  }
}
