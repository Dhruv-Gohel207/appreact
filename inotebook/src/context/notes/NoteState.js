import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []

        const [notes, setNotes] = useState(notesInitial);

        //Get All Notes
        const getNotes = async () => {
            try {
                const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token'),
                    },
                });
        
                if (!response.ok) {
                    throw new Error("Failed to fetch notes");
                }
        
                const json = await response.json();
        
                // Ensure json is an array
                if (Array.isArray(json)) {
                    setNotes(json);
                } else {
                    setNotes([]); // Fallback to an empty array if response isn't an array
                    console.error("Invalid data received from server");
                }
            } catch (error) {
                console.error("Error fetching notes:", error.message);
                setNotes([]); // Fallback to an empty array on error
            }
        };
        

    //Add Notes
    const addNote = async(title, description, tag)=>{
        // TODO: API Call
        try {
            
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = response.json();
        console.log(json) 


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
        } catch (error) {
            console.error("Error adding a note:", error.message);
        }
      }
    //Delete Notes
        const deleteNote = async(id)=>{
            // TODO: API Call
            try{
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
                }
            });
            const json = response.json();
            console.log(json)

            console.log("Deleting the note with id:", id);
            const newNotes = notes.filter(note => note._id !== id);
            setNotes(newNotes);
        } catch (error) {
            console.error("Error adding a note:", error.message);
        }
        }
    //Edit Notes
    const editNote = async(id, title, description, tag)=>{
            // API Call

            try {
    
                const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                    },
                    body: JSON.stringify({title, description, tag})
                });
                const json = response.json();
                console.log(json)
                
                const newNotes = notes.map((note) =>
                    note._id === id ? { ...note, title, description, tag } : note
                );
                setNotes(newNotes);
            } catch (error) {
                console.error("Error updating note:", error.message);
            }
          
    }
        
    return(
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>

            {props.children}
        </NoteContext.Provider>     
    )
}
export default NoteState;   