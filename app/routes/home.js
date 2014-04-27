/*jshint loopfunc:true, camelcase:false */
'use strict';
var Score = require('../models/score');

exports.test = function(req, res){
  res.render('user/test', {title: 'video capturing test'});
};

exports.index = function(req, res){
  res.render('user/game', {title: 'Memory'});
};

exports.login = function(req, res){
  res.render('user/auth', {title: 'Welcome back to EverN'});
};

exports.getScores = function(req,res){
  Score.findHiScores(function(scores){
    res.send({scores:scores});
  });
};

exports.create = function(req, res){
  console.log('XXXXXXname: '+req.body.name);
  console.log('date: '+req.body.date);
  console.log('points: '+req.body.points);
  var score = new Score(req.body);
  score.insert(function(count){
    res.send({count:count});
  });
};
