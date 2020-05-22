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
const database_url = 'mongodb+srv://marc:xTBC19OEWaGOd7Dz@localdb-2oyid.mongodb.net/test?retryWrites=true&w=majoritymongodb+srv://marc:N935vQe8.$hGT3F@localdb-2oyid.mongodb.net/test?retryWrites=true&w=majority';
//const database = 'mongodb://marc:xTBC19OEWaGOd7Dz@main-shard-00-00-03xkr.mongodb.net:27017,main-shard-00-01-03xkr.mongodb.net:27017,main-shard-00-02-03xkr.mongodb.net:27017/main?ssl=true&replicaSet=Main-shard-0&authSource=admin&retryWrites=true';
// Connect to the db
mongoose.connect(database_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('mongodb server connected'))
.catch(err => console.error(err));
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