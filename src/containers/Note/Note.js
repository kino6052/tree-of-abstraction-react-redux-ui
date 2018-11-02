import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import './note.css';

class NoteBlock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editNote: false,
      title: '',
      content: ''
    }
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  handleEditClick(){
    this.setState({ editNote: true });
  }

  handleCancelClick(){
    this.setState({ editNote: false });
  }

  handleSaveClick(){
    let {
      props: {
        id,
        content,
        saveNote
      }
    } = this;
    saveNote(id, content)
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
            <input className={'TitleInput'} value={title}></input>
            <textarea className={'ContentArea'} value={content}></textarea>
            <button onClick={this.handleSaveClick}>Save</button>
            <button onClick={this.handleCancelClick}>Cancel</button>
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

export default connect(mapStateToProps, actions)(Note)
