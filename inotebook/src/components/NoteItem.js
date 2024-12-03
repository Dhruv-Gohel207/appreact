  import React, { useContext } from 'react';
  import noteContext from "../context/notes/noteContext";

  const Noteitem = ({ note, updateNote, showAlert}) => {
    const { deleteNote } = useContext(noteContext); 
    const handleDelete = () => {
      deleteNote(note._id);
      showAlert("Deleted successfully", "success"); // Show alert after deletion
    };

    return (
      <div className="col-md-4">
        <div className="card my-2">
          <div className="card-body bg-primary text-white">
            <h5 className="card-title">{note.title}</h5>
            <i 
             onClick={handleDelete}
              style={{ cursor: "pointer", marginRight: "10px" }}
            > 
              🚮
            </i>
            <i 
            onClick={() => updateNote(note) }
            style={{ cursor: "pointer", marginRight: "10px", color: "blue" }}
          >
            ✏️
          </i>
            <p className="card-text">{note.description}</p>
          </div>
        </div>
      </div>
    );
  };

  export default Noteitem;
