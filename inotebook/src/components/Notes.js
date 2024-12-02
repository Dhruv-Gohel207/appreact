import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getNotes(); // Fetch notes when the component mounts
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      title: currentNote.title,     
      description: currentNote.description,
      tag: currentNote.tag,
    });
    setShowModal(true);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!note.title || !note.description) {
      alert("Title and Description are required");
      return;
    }
    editNote(note.id, note.title, note.description, note.tag);
    setShowModal(false);
    setNote({ id: "", title: "", description: "", tag: "" }); // Clear note state after editing
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote />

      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />;
        })}
      </div>

      {/* Modal for Editing Notes */}
      {showModal && (
        <>
          <div
            className="modal-backdrop"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1040,
            }}
            onClick={() => setShowModal(false)}
          ></div>
          <div
            className="modal"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              display:"flex",
              transform: "translate(-50%, -50%)",
              background: "white",
              padding: "auto",
              borderRadius: "8px",
              zIndex: 1050,
              width: "90%",
              maxWidth: "400px",
            }}
          >
            <form style={{padding:"20px"}}>
            <h2>Edit Note</h2>
              <div  className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={note.title}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={note.description}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">
                  Tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tag"
                  name="tag"
                  value={note.tag}
                  onChange={onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-secondary mx-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Notes;
