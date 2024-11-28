import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
// import AddNote from './AddNote';

const Notes = () => {
  const { notes, setNotes } = useContext(NoteContext);

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="row my-3">
      {/* <AddNote /> */}
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
    </div>
  );
};

export default Notes;
