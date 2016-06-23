'use strict';

var express = require('express');
var router = express.Router();
var _ = require('lodash');
var fs = require('fs');

// API routes

var databasePath = __dirname + '/database.json';
router.get('/api', function(req, res){  // req is request; res is response
  // res.send('paradise!');  -- used to give message of paradise! at localhost:5000/elephant
  // router.get only responds to GET requests
  // read in the database -- asynchronous thing, so don't know how long it will take
  fs.readFile(databasePath, function(err, data){  // __dirname == directory name
    if (err) {console.log(err); }  // this server console appears in the localhost:5000 page
    // sent a response
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.write(data);
    res.end();
  });
});

router.post('/api', function(req, res){  // /api is the path to the server
  var todos = req.body.todos;  // need to somewhere change the todo array to an object

//  var newTodo = req.body;  // req.body has to be an object
//  console.log(newTodo);
/*  fs.readFile(databasePath, function(err, data){
    if (err) { console.log(err); }  // this server console appears in the localhost:5000 page
    // parse data from a string
    var parsedData = JSON.parse(data);  // parse takes a string and returns an array
    if (!parsedData) { console.log('Database is corrupted!!'); }
    // add new item to the database
    parsedData.push(newTodo);  // 
    // convert database back to a string  */
    // var newDBString = JSON.stringify(parsedData);
    fs.writeFile(databasePath, todos, function(err){
      if (err) { console.log(err); }  // this server console appears in the localhost:5000 page
      // there's no debugger for node.js server, have to rely on console.log
      // respond to the client
      res.writeHead(200, {'Content-Type': 'text/json'});  // sends the database back
      // res.write(newDBString);
      res.write(todos);
      res.end();
    });
//  });
});

// Everything route

router.get('/*', function indexRouteHandler (req, res) {
  res.render('view', {
    title: "Website Example",
    token: _.uniqueId()
  });
});




module.exports = router;