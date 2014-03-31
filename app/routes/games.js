/*jshint loopfunc:true, camelcase:false */
'use strict';

var Team = require('../models/team');
//var User = require('../models/user');
var Game = require('../models/game');

/*
//finds all games for a particular user
exports.index = function(req, res){
  console.log('----INDEX:req.params.userId----');
  console.log(req.params.id);
  User.findById(req.params.id, function(user){
    //console.log('----INDEX:user----');
    //console.log(user);
    if(user.teams!==null){
      var teams = user.teams;
      var results = [];
      for(var i=0; i<teams.length; i++){
        var temp = teams[i].toString();
        Team.findById(temp, function(record){
          //console.log('TEMP!!!!!!');
          //console.log(temp);
          //console.log('TEAM!!!!!!');
          //console.log(record);
          results.push(record);
        });
      }
      res.send({records:results});
    }else{
      res.send({records:'User has no teams'});
    }
  });
};
*/

exports.showBySport = function(req, res){
  Game.findBySportName(req.params.sportName, function(games){
    //res.render('home/index', {title: 'teams by sport', teams:teams});
    res.send({games:games});
  });
};

exports.showByTeam = function(req, res){
  Game.findByTeam(req.params.sportName, req.params.teamLongName, function(games){
    res.send({games:games});
  });
};

exports.getTeams = function(req, res){
  res.render('admin/get-teams');
};

exports.insert = function(req, res){
  var team = new Team(req.body);
  team.insert(function(err, record){
    res.send(record);
  });
};

exports.populate = function(req, res){
  console.log('GAMES POPULATE. REQ: ', req.body);
  Game.autoCreate(req.body, function(records){
    res.send(records);
  });
};

/*
exports.populate = function(req, res){
  console.log('GAMES POPULATE: ', req.body);
  var games = req.body.events;
  var gameData = [];
  for(var i=0; i<games.length; i++){
    var data = games[i];
    var object = {};
    object.teams = [];     //WATCH FOR BUGS LATER!
    var tempTeams = [data.performers[0].short_name, data.performers[1].short_name];
    for(var x=0; x<tempTeams.length; x++){
      Team.findByName(tempTeams[x], function(team){
        object.teams.push(team._id);
      });
    }
    object._id = data.id;
    object.title = data.title;
    object.shortTitle = data.short_title;
    object.sportName = data.taxonomies[1].name;
    object.city = data.venue.city;
    object.ticketURL  = data.url;
    object.locationData = data.location;
    gameData.push(object);
  }
  //Game.autoCreate(gameData, function(records){
  //});
  res.send({gameData:gameData});
};
*/
