/*jshint loopfunc: true */
'use strict';

var Team = require('../models/team');
var User = require('../models/user');

//finds all teams for a particular user
exports.index = function(req, res){
  console.log('----INDEX:req.params.userId----');
  console.log(req.params.id);
  var id = req.params.id.toString();
  var records = [];

  User.findById(id, function(user){
    if(user.teams.length !== 0){
      var teams = user.teams;
      console.log(user);

      for(var i=0; i < teams.length; i++){
        console.log(i);
        var temp = teams[i].toString();
        Team.findById(temp, function(record){
          console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
          console.log(record);
          records.push(record);
          if (records.length === teams.length){
            console.log('DONE!', records);
            res.send({records:records});
          }
        });
      }

    }else{
      res.send({none:'User has no teams'});
    }
  });
};

exports.showBySport = function(req, res){
  Team.findBySportName(req.params.sportName, function(teams){
    //res.render('home/index', {title: 'teams by sport', teams:teams});
    res.send({teams:teams});
  });
};

exports.getTeamById = function(req, res){
  Team.findById(req.params.id, function(team){
    res.send(team);
  });
};

exports.getTeamByName = function(req, res){
  Team.findByName(req.params.name, function(team){
    res.send(team);
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
  var sportName = req.body.sports[0].name;
  var leagueShortName = req.body.sports[0].leagues[0].shortName;
  var leagueName = req.body.sports[0].leagues[0].name;
  var teams = req.body.sports[0].leagues[0].teams;
  var teamData = [];
  var dbData = [];
  for(var i=0; i<teams.length; i++){
    var data = teams[i];
    var object = {};
    object._id = data.uid;
    object.name = data.name;
    object.sportName = sportName;
    object.leagueShortName = leagueShortName;
    object.leagueName = leagueName;
    object.city = data.location;
    object.color = data.color;
    object.schedule = [];     //WATCH FOR BUGS LATER!
    teamData.push(object);
  }
  Team.autoCreate(teamData, function(records){
    dbData.push(records);
  });
  res.send({teamData:teamData, dbData:dbData});
};
