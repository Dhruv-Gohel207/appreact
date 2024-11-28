const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes'); 
const { body, validationResult } = require('express-validator');
 



//routes:1 Get All the Notes using : get 
router.get('/fetchallnotes', fetchuser, async(req, res)=>{
    try {
        const notes = await Notes.find({user: req.user.id})
        res.json(notes)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//routes:2 Add a new Notes using : post "/api/notes/addnote". Login required 
    router.post('/addnote', fetchuser, [
        body('title', 'Enter a valid title').isLength({ min: 3 }),
        body('description', 'Description must be at least 5 characters').isLength({ min: 5 })
    ], async(req, res)=>{
        try {
            
            const{title, description, tag} = req.body;
            //if there are error, return the bad request and the error 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const notes = new Notes({
                title , description, tag, user:req.user.id
            })
            const savedNote = await notes.save()
            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

//routes:3 Updates aa existing Notes using : put "/api/notes/updatenote". Login required 
    router.put('/updatenote/:id', fetchuser, async(req, res)=>{
        const{title, description, tag} = req.body;

        try {
            // createa a new notes object 
            const newNote = {};
            if (title) newNote.title = title;
            if (description) newNote.description = description;
            if (tag) newNote.tag = tag;
    
            //find the eexitsting notes for update and update it 
            let note = await Notes.findById(req.params.id);
            if (!note) {
                return res.status(404).send("Note not found");
            }
    
            if(note.user.toString() !== req.user.id){
                res.status(401).send("Not autherisezd to update this note");
            }
    
            //update the notes
            note = await Notes.findByIdAndUpdate(
                req.params.id,
                {$set: newNote},
                {new: true}
            )
            res.json({note});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })
//routes:4 Deleting an existing Notes using : Delete "/api/notes/deletenote". Login required 
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the existing note to delete
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found");
        }

        // Check if the logged-in user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not authorized to delete this note");
        }

        // Delete the note
        await Notes.findByIdAndDelete(req.params.id);

        res.json({ success: true, message: "Note has been deleted successfully" , note:note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router