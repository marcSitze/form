const express = require('express');
const router = express.Router();
const Candidat = require('../models/Candidat');

// Get all Candidates
router.get('/', async (req, res) => {
    try{
        const users = await Candidat.find({}); 
        res.render('leduc/users/users', { 
            users: users,
            title: "Candidats" 
        });
    } catch(err) {
        console.error(err);
    }
});

// Get a unique Candidate
router.get('/:id', async (req, res) => {
    const query = req.params.id;
   // console.log(query);
    try{
        const user = await Candidat.findById(query);
        res.render("leduc/users/user", { 
            user: user,
            title: "Candidat"
         });
    } catch(err) {
        console.error(err);
    }
});

module.exports = router;