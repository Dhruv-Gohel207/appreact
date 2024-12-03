import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []

        const [notes, setNotes] = useState(notesInitial);

        //Get All Notes
        const getNotes = async () => {
            //  API Call 
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc0NmM2NmQ2ZDUzMTM0NmRlY2I1N2Q5In0sImlhdCI6MTczMjcwMjQyMH0.wOg0vMH5q03jHWez135u8Bl0xZK_3Oo9--QHNr6jUaY"
                }
            });
            const json = await response.json();
            setNotes(json);
    
          }

    //Add Notes
    const addNote = async(title, description, tag)=>{
        // TODO: API Call
        try {
            
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc0NmM2NmQ2ZDUzMTM0NmRlY2I1N2Q5In0sImlhdCI6MTczMjcwMjQyMH0.wOg0vMH5q03jHWez135u8Bl0xZK_3Oo9--QHNr6jUaY"
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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc0NmM2NmQ2ZDUzMTM0NmRlY2I1N2Q5In0sImlhdCI6MTczMjcwMjQyMH0.wOg0vMH5q03jHWez135u8Bl0xZK_3Oo9--QHNr6jUaY"
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
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc0NmM2NmQ2ZDUzMTM0NmRlY2I1N2Q5In0sImlhdCI6MTczMjcwMjQyMH0.wOg0vMH5q03jHWez135u8Bl0xZK_3Oo9--QHNr6jUaY"
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