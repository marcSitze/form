const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Candidat = require('../models/Candidat');

// Render the form
router.get('/', (req, res) => {
    res.render('index', { user: new Candidat() });
});

// render the congrat page
router.get('/welcome', (req, res) => {
    res.render('welcome');
});

// Get form values and save it in db
router.post('/', [
    // check name 
    check('name', 'please Enter your name').not().isEmpty(),
    check('date', 'please enter a valid date').not().isEmpty(),
    check('lieu', 'please enter ton lieu de naissance').not().isEmpty(),
    check('national', 'please enter ta national ID').not().isEmpty(),
    check('phone', 'please your phone number').not().isEmpty(),
    check('email', 'please enter a valid email').isEmail(),
    check('adresse', 'please enter your adresse').not().isEmpty(),
    check('city', 'please enter your city').not().isEmpty(),
    check('etablissement1', 'please enter your 1st year school').not().isEmpty(),
    check('etablissement2', 'please enter your 2nd year school').not().isEmpty(),
    check('etablissement3', 'please enter your 3rd year school').not().isEmpty(),
    check('etablissement4', 'please enter your 4th year school').not().isEmpty(),
    check('etablissement5', 'please enter your 5th year school').not().isEmpty()
    
], async (req, res) => {
    const user = new Candidat({
        identite: req.body.identite,
        name: req.body.name,
        date: new Date(req.body.date),
        lieu: req.body.lieu,
        national: req.body.national,
        phone: req.body.phone,
        email: req.body.email,
        adresse: req.body.adresse,
        code: req.body.code,
        city: req.body.city,
        region: req.body.region,
        etablissement1: req.body.etablissement1,
        annee1: new Date(req.body.annee1),
        etablissement2: req.body.etablissement2,
        annee2: new Date(req.body.annee2),
        etablissement3: req.body.etablissement3,
        annee3: new Date(req.body.annee3),
        etablissement4: req.body.etablissement4,
        annee4: new Date(req.body.annee4),
        etablissement5: req.body.etablissement5,
        annee5: new Date(req.body.annee5)

    });
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      //  return res.status(400).json({ errors: errors.array() });
        return res.status(400).render('index', {
            user: user, 
            errors: errors.array()
         });
    }

    try {
        const newUser = await user.save();
        console.log(newUser);
        res.status(201).redirect('welcome');
        
    } catch(err) {
        res.status(400).send(err);
        console.error(err);
    }
});

module.exports = router;