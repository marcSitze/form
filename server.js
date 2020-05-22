const express = require('express');
const app = express();
// require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const PORT = process.env.PORT || 8000;
const indexRoute = require('./routes/index');
const zachRoute = require('./routes/zach');

// Set view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Connect to the db
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log('Mongodb Connected...'));

// set Static files
//app.use(express.static(__direname + '/public'));
app.use(express.static(__dirname + '/public'));


// Body parser
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

// set routes 
app.use('/', indexRoute );
app.use('/zach', zachRoute );
app.listen(PORT, () => console.log('Server running at ' + PORT));