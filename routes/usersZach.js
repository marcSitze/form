const express = require('express');
const router = express.Router();
const Zach = require('../models/Zach');

// Get all Candidates
router.get('/', async (req, res) => {
    try{
        const users = await Zach.find({}); 
        res.render('zach/users/users', {
            title: "candidats", 
            users: users 
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
        const user = await Zach.findById(query);
        res.render("zach/users/user", { 
            user: user,
            title: "Candidat"
         });
    } catch(err) {
        console.error(err);
    }
});

module.exports = router;