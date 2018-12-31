const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./exampleSchema')
const mongoose = require('mongoose');
const app = express()


mongoose.connect('mongodb://localhost/users');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

app.get('/', function(req, res, next){
  return res.sendFile('/var/www/public/index.html')
});

app.use('/users', graphqlHTTP((req, res) => ({
    schema,
    graphiql: true,
})));

app.listen('80', () => {
    console.log('Server is listening on port 3000…')
});