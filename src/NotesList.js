import React from "react";
import Note from "./Note";

const NotesList = (props) => {
  // check for search matches
  const filterCallback = (note) => note.doesMatchSearch;
  const yesMatch = props.notes.filter(filterCallback);

  const renderNote = (note) => (
    <Note
      onType={props.onType}
      note={note}
      key={note.id}
      removeNote={props.removeNote}
    />
  );
  // maps only search matches
  const noteElements = yesMatch.map(renderNote);
  return (
    <ul className="notes-list">
      {/*console.log(props.notes)*/}
      {noteElements}
    </ul>
  );
};

export default NotesList;
