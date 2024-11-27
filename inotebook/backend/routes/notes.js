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

//routes:2 Add a new Notes using : get 
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 })
], async(req, res)=>{
    try {
        
        const{title, description, tag} = req.body;
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
module.exports = router