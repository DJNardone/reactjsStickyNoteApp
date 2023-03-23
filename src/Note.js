import React from "react";

const Note = (props) => {
  const updateTitle = (e) => {
    const updateValue = e.target.value;
    const editId = props.note.id;
    props.onType(editId, "title", updateValue);
  };

  const updateDescript = (e) => {
    const updateValue = e.target.value;
    const editId = props.note.id;
    props.onType(editId, "description", updateValue);
  };

  const deleteById = () => props.removeNote(props.note.id);

  return (
    <li className="note">
      <input
        value={props.note.title}
        type="text"
        placeholder="Title"
        className="note__title"
        onChange={updateTitle}
      />
      <textarea
        value={props.note.description}
        placeholder="Description..."
        className="note__description"
        onChange={updateDescript}
      />
      <span onClick={deleteById} className="note__delete">
        X
      </span>
    </li>
  );
};

export default Note;
