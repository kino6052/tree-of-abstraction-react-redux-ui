import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import './note.css';

class NoteBlock extends React.Component {
  constructor(props){
    super(props);
    let {
      title,
      content
    } = props;
    this.state = {
      editNote: false,
      title,
      content
    }
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleOnTitleChange = this.handleOnTitleChange.bind(this);
    this.handleOnContentChange = this.handleOnContentChange.bind(this);
  }

  handleEditClick(){
    this.setState({ editNote: true });
  }

  handleCancelClick(){
    let {
      props: {
        title,
        content
      }
    } = this;
    this.setState(
      {
        editNote: false,
        title,
        content 
      }
    );
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

  handleOnTitleChange(e){
    let {
      target: {
        value
      } = {}
    } = e;
    this.setState({title: value});
  }

  handleOnContentChange(e){
    let {
      target: {
        value
      } = {}
    } = e;
    this.setState({content: value});
  }

  render() {
    let {
      state: {
        editNote,
        title,
        content
      } = {},
      props: {
        id
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
            <input className={'TitleInput'} onChange={this.handleOnTitleChange} value={title}></input>
            <textarea className={'ContentArea'} onChange={this.handleOnContentChange} value={content}></textarea>
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
