const express = require("express");      //Express is a web application framework
const mongoose = require("mongoose");    //Mongoose allows you to use schema in mongodb
const app = express();  
const passport = require('passport');   //This allows Javascript Web Token to be saved in Local Storage
const path = require('path');

const users = require('./routes/api/users');
const plaid = require('./routes/api/plaid');

app.use( express.urlencoded( {extended: false} ));
app.use( express.json() );

const db = require("./config/keys").mongoURI;     // DB Config

mongoose.connect( db, { useNewUrlParser:true, useUnifiedTopology: true } ) // Connect to MongoDB
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/plaid', plaid);

if (process.env.NODE_ENV === 'production')
{
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}
                                          /* Changed from 5000 to 5001 to avoid conflicts with Mern-Auth*/
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`)); 