const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Zach = require('../models/Zach');
const auth = require('../middlewares/auth');


// Render the form
router.get('/', (req, res) => {
    res.render('zach/index', { user: new Zach() });
});

// render the congrat page
router.get('/welcome', (req, res) => {
    res.render('zach/welcome');
});
const signInToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4ifQ.jmAGPb7YzjEmHE4j47Iy3arOfqpRoQBL2eyXWZInt9w';
// Admin route private
router.get('/admin', auth, async (req, res) => {
    
    try {
        const user = await Zach.findById(req.user.username);
        res.send('here is the admin page');
    } catch (err) {
        res.send('Error in fetching the user');
    }
});

// Render login page 
router.get('/login', (req, res) => {
    res.render('zach/login');
});


// login form for the admin 
router.post('/login', [
    check('username', 'Please enter your username').not().isEmpty(),
    check('password', 'Please enter your password').not().isEmpty()
], 
async (req, res) => {

   
    //    const loginToken = signToken('admin')
    //    .then(token => token)
    //    .catch(err => console.log(err));

       res.header('authorization', signToken);
       console.log(res.header('authorization'))

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).render('zach/login', { errors: errors.array() });
    }
    const { username, password } = req.body;
    try {
        let user = await Zach.findOne({ username: 'admin' });

        if(!user){
            return res.status(400).send('User not exist');
        }
        let isMatch = true;
        // if(password == user.password){
        //     isMatch = true;
        // }else{
        //     isMatch = false;
        // }

        if(!isMatch)
            res.status(400).send('Incorrect Password');

        // const payload = {
        //     user: {
        //         username: 'admin'
        //     }
        // };
        const signToken = () => {
            jwt.sign({ username: 'admin' }, "randomString",{ expiresIn: '90d' }, (err, token) => {
                if(err) throw err;
                console.log(token);
                return token;
            });
           }

// const loginToken = signToken('admin').then(token => token).catch(err => console.log(err));
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
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
        console.log(newUser);
        res.status(201).redirect('zach/welcome');
        
    } catch(err) {
        res.status(400).send(err);
        console.error(err);
    }
});

module.exports = router;