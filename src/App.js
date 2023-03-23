import React, { Component } from "react";
import Header from "./Header";
import NotesList from "./NotesList";

class App extends Component {
  state = {
    searchText: "",
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ]
  };

  // add a new note to the existing notes array
  addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    const newNotes = [newNote, ...this.state.notes];
    this.setState({ notes: newNotes });
  };

  // delete a sticky note
  removeNote = (clickedId) => {
    const filterCallback = (note) => note.id !== clickedId;
    const newNotes = this.state.notes.filter(filterCallback);
    this.setState({ notes: newNotes });
  };

  // allow users to edit their notes
  onType = (editId, updateKey, updateValue) => {
    // editId = id of note being edited
    // update Key = title or description field
    // updateValue = value of field changed
    const updateNote = this.state.notes.map((note) => {
      if (note.id !== editId) {
        return note;
      } else {
        if (updateKey === "title") {
          note.title = updateValue;
          return note;
        } else {
          note.description = updateValue;
          return note;
        }
      }
    });
    this.setState({ notes: updateNote });
  };

  // matching text search bar
  onSearch = (text) => {
    const searchLowerText = text.toLowerCase();
    const searchNote = this.state.notes.map((note) => {
      if (!searchLowerText) {
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatch = title.includes(searchLowerText);
        const descriptionMatch = description.includes(searchLowerText);
        const hasMatch = titleMatch || descriptionMatch;
        note.doesMatchSearch = hasMatch;
        return note;
      }
    });
    this.setState({
      notes: searchNote,
      searchText: searchLowerText
    });
  };

  // retrieves notes from local storage if any notes are saved
  componentDidMount() {
    const savedNotesString = localStorage.getItem("savedNotes");
    if (savedNotesString) {
      const savedNotes = JSON.parse(savedNotesString);
      this.setState({ notes: savedNotes });
    }
  }

  // saves to local storage after each render
  componentDidUpdate() {
    const savedNotesString = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", savedNotesString);
  }

  render() {
    return (
      <div>
        <Header
          onSearch={this.onSearch}
          addNote={this.addNote}
          searchText={this.state.searchText}
        />
        <NotesList
          removeNote={this.removeNote}
          onType={this.onType}
          notes={this.state.notes}
        />
      </div>
    );
  }
}

export default App;
