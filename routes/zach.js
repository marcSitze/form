const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Zach = require('../models/Zach');



// Render the form
router.get('/', (req, res) => {
    res.render('zach/form', { 
      user: new Zach(),
    title: "Zach Registration"
   });
});

// render the congrat page
router.get('/welcome', (req, res) => {
    res.render('zach/welcome', {
      title: "welcome"
    });
});

// Get form values and save it in db
router.post('/', [
    // check name 
    check('name', 'please Enter your name').not().isEmpty(),
    check('date', 'please enter a valid date').not().isEmpty(),
    check('phone', 'please your phone number').not().isEmpty(),
    check('email', 'please enter a valid email').isEmail(),
    check('adresse', 'please enter your adresse').not().isEmpty()

], async (req, res) => {
    const user = new Zach({
        identite: req.body.identite,
        name: req.body.name,
        date: new Date(req.body.date),
        phone: req.body.phone,
        email: req.body.email,
        adresse: req.body.adresse,
        formation: req.body.formation
    });
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      //  return res.status(400).json({ errors: errors.array() });
        return res.status(400).render('zach/index', {
            user: user, 
            errors: errors.array()
         });
    }

    try {
        const newUser = await user.save();
       // console.log(newUser);
        res.status(201).redirect('zach/welcome');
        
    } catch(err) {
        res.status(400).send(err);
        console.error(err);
    }
});

module.exports = router;