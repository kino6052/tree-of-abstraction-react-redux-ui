import React from 'react';
import { connect } from 'react-redux';



class NoteBlock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editNote: false,
      title: '',
      content: ''
    }
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleEditClick(){
    let {
      state: {
        editNote = false
      } = {}
    } = this || {};
    console.log('here');
    this.setState({ editNote: !editNote });
  }

  render() {
    let {
      state: {
        editNote
      } = {},
      props: {
        id,
        title,
        content
      }
    } = this;
    return (
      <div>
        { !editNote &&
            <div key={id} id={id}>
            <b>{title}</b>
            <div className='Edit' onClick={this.handleEditClick}>Edit</div>
            <p>{content}</p>
          </div>
        }
        { editNote &&
          <div key={id} id={id}>
            <input></input>
            <button>Save</button>
            <button>Cancel</button>
          </div>
        }
      </div>
    )
  }
}

export class Note extends React.Component {

  render() {
    let {
      props: {
        notes = [],
        currentNotes = []
      } = {}
    } = this;
    return (
      <div className={'Note'}>
        <h1> Notes </h1>
        { currentNotes.map(
          (note) => {
            let {
              title,
              content,
              _id
            } = note;
            return (
              <NoteBlock id={_id} title={title} content={content} />
            );
          }
        ) }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let {
    notes = [],
    selected: {
      currentNotes
    } = {}
  } = state;
  return { notes, currentNotes };
}

export default connect(mapStateToProps)(Note)
