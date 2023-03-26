import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"              
  const notesInitial = []                               // Note is blank
  const [notes, setNotes] = useState(notesInitial)

  // 1. Get all Notes from Backend

   const getNotes = async () => {
  
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')           // token is get to localstroage
      }
    }); 
      const json = await response.json()
       //console.log(json)
       setNotes(json)
  }


  // 2. Add a Note

    const addNote = async (title, description, tag) => {
  
    // API Call 
      const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})         // Convert json to String
    });
     
    const note = await response.json();
    setNotes(notes.concat(note))              // Means add notes to same useid  
  }


  // 3. Delete a Note

    const deleteNote = async (id) => {
  
    // API Call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
      },
    });
    
      const json = response.json();
      console.log(json);              // if the comment  the console produce the error json not define

     // Logic to Delete the Note in client 
          const newNotes = notes.filter((note) => { 
          return note._id !== id 
       })
          setNotes(newNotes);
      }


  // 4. Edit a Note
        const editNote = async (id, title, description, tag) => {          // the id is note id
          // API Call 
          const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
          });
          const json = response.json();
         // console.log(json);
          let newNotes = JSON.parse(JSON.stringify(notes))
  
        // Logic to edit in client side
              for (let index = 0; index < notes.length; index++) {
                const element = newNotes[index];
                if (element._id === id) {
                  newNotes[index].title = title;
                  newNotes[index].description = description;
                  newNotes[index].tag = tag;
                  break;
                }
              }
              setNotes(newNotes);
            }

          return (
            <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
              {props.children}
            </NoteContext.Provider>
          )
}
export default NoteState;