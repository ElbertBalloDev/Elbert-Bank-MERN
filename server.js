const express = require("express");    
const mongoose = require("mongoose");   
const app = express();  
const passport = require('passport'); 
const path = require('path');

const users = require('./routes/api/users');
const plaid = require('./routes/api/plaid');

app.use( express.urlencoded( {extended: false} ));
app.use( express.json() );

const db = require("./config/keys").mongoURI;  

mongoose.connect( db, { useNewUrlParser:true, useUnifiedTopology: true } ) 
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
                                          
const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`Server up and running on port ${port} !`)); 
