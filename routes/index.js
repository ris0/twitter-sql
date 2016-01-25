'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models').User;
var Tweet = require('../models').Tweet;

module.exports = function makeRouterWithSockets (io) {

  // a reusable function
  function respondWithAllTweets (req, res, next){
    //this returns and array tweetbank.list();
    // return models.User.findAll({include: [models.Tweet]})
    // .then(function(allTheTweets) {
    //     res.render('index', {
    //       title: 'Twitter.js',
    //       tweets: allTheTweets,
    //       showForm: true
    //     });
    // });
    return Tweet.findAll({include: [User]})
    .then(function(allTheTweets) {  
        res.render('index', {
          title: 'Twitter.js',
          tweets: !allTheTweets.length ? [allTheTweets] : allTheTweets,
          showForm: true
      });
    });   

    // var allTheTweets = models.User.findAll().then(function() {
    //   models.Tweet.findAll();
    //   console.log(models.Tweet.findAll())});
    // allTheTweets.then(
    //   function () {
    //     console.log(allTheTweets);
    //     res.render('index', {
    //       title: 'Twitter.js',
    //       tweets: allTheTweets,
    //       showForm: true
    //     });
    //   }
    // );
  }

  // here we basically treet the root view and tweets view as identical
  router.get('/', respondWithAllTweets);
  router.get('/tweets', respondWithAllTweets);

  // single-user page
  router.get('/users/:username', function(req, res, next){
    return Tweet.find({ include: [User]}, {where: {name: req.params.username} })
    .then( function(tweetsForName) {
        res.render('index', {
        title: 'Twitter.js',
        tweets: !tweetsForName.length ? [tweetsForName] : tweetsForName,
        showForm: true,
        username: req.params.username
      });
    }); 



    // User.find({where: {name: req.params.username }, include: [Tweet] })
    // .then( function(tweetsForName) {
    //     console.log(tweetsForName);
    //     res.render('index', {
    //     title: 'Twitter.js',
    //     tweets: tweetsForName,
    //     showForm: true,
    //     username: req.params.username
    //   });
    // }); 

  });

  // single-tweet page
  router.get('/tweets/:id', function(req, res, next){
    return Tweet.find({ include: [User], where: {id: +req.params.id} })
    .then( function(tweetsWithThatId) {
        res.render('index', {
        title: 'Twitter.js',
        tweets: !tweetsWithThatId.length ? [tweetsWithThatId] : tweetsWithThatId
      });
    });
  });

  // create a new tweet
  router.post('/tweets', function(req, res, next){
    //find name and use userid or create user
    //use req.body.name
    

    //create tweet using req.body.text
    return Tweet.create({tweet: })


    // var newTweet = models.add(req.body.name, req.body.text);
    // io.sockets.emit('new_tweet', newTweet);
    res.redirect('/');
  });

  // // replaced this hard-coded route with general static routing in app.js
  // router.get('/stylesheets/style.css', function(req, res, next){
  //   res.sendFile('/stylesheets/style.css', { root: __dirname + '/../public/' });
  // });

  return router;
}
