/*jshint loopfunc: true */
'use strict';

module.exports = Team;
var teams = global.nss.db.collection('teams');
//var espnKey = process.env.ESPNKEY;
//var $ = require('../static/js/vendor/jquery');
//var Mongo = require('mongodb');
//var _ = require('lodash');
//var fs = require('fs');
//var path = require('path');


// watch for bugs with this.schedule: empty arrays can be dangerous!
function Team(team){
  this._id = team._id;
  this.name = team.name;
  this.sportName = team.sportName;
  this.leagueName = team.leagueName;
  this.leagueShortName = team.leagueShortName;
  this.city = team.city;
  this.color = team.color;
  this.schedule = team.schedule || [];
  this.longName = team.city + ' ' + team.name;
}

Team.prototype.insert = function(fn){
  var self = this;
  teams.insert(self, function(err, records){
    fn(err, records);
  });
};

Team.autoCreate = function(data, fn){
  var dbData = [];
  for(var i=0; i<data.length; i++){
    var team = new Team(data[i]);
    team.insert(function(err, records){//TODO: fix this, making functions inside a loop is a bad idea
      dbData.push(records[0]);
    });
  }
  fn(dbData);
};

Team.destroy = function(_id, fn){
  //var _id = Mongo.ObjectID(id);

  teams.remove({_id:_id}, function(err, count){
    fn(count);
  });
};

Team.prototype.update = function(fn){
  var self = this;
  teams.update({_id: self._id}, self, function(err, result){
    fn(result);
  });
};


Team.findById = function(_id, fn){
  //var _id = new Mongo.ObjectID(id);
  teams.findOne({_id:_id}, function(err, record){
    console.log(_id);
    console.log(record);
    fn(record);
  });
};

Team.findAll = function(fn){
  teams.find().toArray(function(err, records){
    fn(records);
  });
};

Team.findBySportName = function(sportName, fn){
  teams.find({sportName:sportName}).toArray(function(err, records){
    fn(records);
  });
};

Team.findByName = function(name, fn){
  console.log('TEAM FIND BY NAME. NAME: ', name);
  teams.find({name:name}).toArray(function(err, records){
    fn(records);
  });
};

Team.findByCity = function(city, fn){
  teams.find({city:city}).toArray(function(err, records){
    fn(records);
  });
};

/*
Team.findByUser = function(userId, fn){
  User.findById(userId, function(user){
    var teams = user.teams;
    var records = [];
    for(var i=0; i<teams.length; i++){
      Team.findById(teams[i].teamId, function(team){
        records.push(team);
      });
    }
    fn(records);
  });
};
*/
