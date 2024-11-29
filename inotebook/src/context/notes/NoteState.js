import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) =>{
    const notesInitial = [
        {
          "_id": "6747edb79866172b83630044",
          "user": "6746c66d6d531346decb57d9",
          "title": "my title",
          "description": "this is the description for addnotes",
          "tag": "addnote",
          "date": "2024-11-28T04:12:39.404Z",
          "__v": 0
        },
        {
          "_id": "6747edb89866172b83630046",
          "user": "6746c66d6d531346decb57d9",
          "title": "my title",
          "description": "this is the description for addnotes",
          "tag": "addnote",
          "date": "2024-11-28T04:12:40.142Z",
          "__v": 0
        },
        {
          "_id": "6747ee53cbe91d5476038209",
          "user": "6746c66d6d531346decb57d9",
          "title": "my playlist",
          "description": "this is the for new playlist",
          "tag": "YouTube",
          "date": "2024-11-28T04:15:15.298Z",
          "__v": 0
        }
      ]

        const [notes, setNotes] = useState(notesInitial);

    //Add Notes
    const addNote = (title, description, tag)=>{
        // TODO: API Call
        console.log("Adding a new note")
        const note = {
            "_id": Date.now(),
            "user": "user-id-placeholder",
            title,
            description,
            tag,
            "date": new Date()
            
        };
        setNotes(notes.concat(note)) 
      }
    //Delete Notes
        const deleteNote = (id)=>{
            // TODO: API Call
            console.log("Deleting the note with id:", id);
            const newNotes = notes.filter(note => note._id !== id);
    setNotes(newNotes);
        }
    //Edit Notes
    const editNote = async(id, title, description, tag)=>{
                    // TODO: API Call

            for (let index = 0; index < notes.length; index++) {
                const element = notes[index];
                    if (element._id === id) {
                        element.title = title;
                        element.description = description;
                        element.tag = tag;
                    }
            }
    }
        
    return(
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>

            {props.children}
        </NoteContext.Provider>     
    )
}
export default NoteState;   