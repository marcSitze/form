const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Candidat = require('../models/Candidat');

// Render the form
router.get('/', (req, res) => {
    res.render('leduc/form', { 
        user: new Candidat(),
        title: "Enregistrement"
     });
});

// render the congrat page
router.get('/welcome', (req, res) => {
    res.render('leduc/welcome', {
        title: "Welcome"
    });
});

// Get form values and save it in db
router.post('/', [
    // check name 
    check('name', 'veillez entrer votre nom').not().isEmpty(),
    check('date', 'veillez entrer votre date de naissance').not().isEmpty(),
    check('lieu', 'veillez entrer votre lieu de naissance').not().isEmpty(),
   // check('national', 'veillez entrer votre national ID').not().isEmpty(),
    check('phone', 'veillez entrer votre numéro de téléphone').not().isEmpty(),
    check('email', 'veillez entrer votre email').isEmail(),
    check('adresse', 'veillez entrer votre adresse').not().isEmpty(),
    check('city', 'veillez entrer votre ville').not().isEmpty()
    
], async (req, res) => {
    const user = new Candidat({
        identite: req.body.identite,
        name: req.body.name,
        date: req.body.date,
        lieu: req.body.lieu,
        national: req.body.national,
        phone: req.body.phone,
        email: req.body.email,
        adresse: req.body.adresse,
        code: req.body.code,
        city: req.body.city,
        region: req.body.region,
        module1: req.body.module1,
        module2: req.body.module2,
        module3: req.body.module3,
        module4: req.body.module4,
        etablissement1: req.body.etablissement1,
        annee1: req.body.annee1,
        etablissement2: req.body.etablissement2,
        annee2: req.body.annee2,
        etablissement3: req.body.etablissement3,
        annee3: req.body.annee3,
        etablissement4: req.body.etablissement4,
        annee4: req.body.annee4,
        etablissement5: req.body.etablissement5,
        annee5: req.body.annee5,
        langue: req.body.langue,
        langue2: req.body.langue2
    });
    const errors = validationResult(req);
console.log(user);
    if(!errors.isEmpty()){
      //  return res.status(400).json({ errors: errors.array() });
        return res.status(400).render('leduc/form', {
            user: user,
            title: "Enregistrement", 
            errors: errors.array()
         });
    }

    try {
        const newUser = await user.save();
       // console.log(newUser);
        res.status(201).redirect('leduc/welcome');
        
    } catch(err) {
        res.status(400).send(err);
        console.error(err);
    }
});

module.exports = router;