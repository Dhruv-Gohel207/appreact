import React, { useContext } from 'react';
import noteContext from "../context/notes/noteContext";

const Noteitem = ({ note }) => {
  const { deleteNote } = useContext(noteContext); // Destructure deleteNote properly

  return (
    <div className="col-md-4">
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <i 
            onClick={() => { deleteNote(note._id); }} // Call deleteNote with the note ID
            style={{ cursor: "pointer", marginRight: "10px" }}
          >
            🚮
          </i>
          <i style={{ cursor: "pointer" }}> ✍ </i>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
