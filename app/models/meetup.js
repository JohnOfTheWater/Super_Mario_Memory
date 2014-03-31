/*jshint loopfunc: true */
'use strict';

module.exports = Meetup;
var meetups = global.nss.db.collection('meetups');
var Mongo = require('mongodb');
//var _ = require('lodash');
//var fs = require('fs');
//var path = require('path');

function Meetup(meetup){
  this._id = meetup._id;
  this.gameId = meetup.gameId;
  this.userId = meetup.userId ? new Mongo.ObjectID(meetup.userId.toString()) : meetup.userId;
  this.teams = meetup.teams || [];
  this.sportName = meetup.sportName;
  this.city = meetup.city;
  this.loyalty = meetup.loyalty;
  this.attendees = meetup.attendees|| [];
  this.place = meetup.place;
}

Meetup.prototype.insert = function(fn){
  var self = this;
  meetups.insert(self, function(err, records){
    fn(err, records);
  });
};

Meetup.destroy = function(_id, fn){

  meetups.remove({_id:_id}, function(err, count){
    fn(count);
  });
};

Meetup.prototype.update = function(fn){
  meetups.update({_id: this._id}, this, function(err, result){
    fn(result);
  });
};

Meetup.findById = function(_id, fn){
  meetups.findOne({_id:_id}, function(err, record){
    fn(record);
  });
};

Meetup.findAll = function(fn){
  meetups.find().toArray(function(err, records){
    fn(records);
  });
};

Meetup.findBySportName = function(sportName, fn){
  meetups.find({sportName:sportName}).toArray(function(err, records){
    fn(records);
  });
};

Meetup.findByAttendee = function(attendee, fn){
  meetups.find({attendees: {$in: [attendee]}}).toArray(function(err, records){
    fn(records);
  });
};

Meetup.findByTeam = function(team, fn){
  meetups.find({teams: {$in: [team]}}).toArray(function(err, records){
    fn(records);
  });
};

/*
Meetup.findByTeam = function(team, fn){
  meetups.find().toArray(function(err, records){
    var results = [];
    _.each(records, function(record){
      _.each(record.teams, function(oneTeam){
        if(oneTeam === team){
          results.push(record);
        }
      });
    });
    fn(results);
  });
};
*/

Meetup.findByCity = function(city, fn){
  meetups.find({city:city}).toArray(function(err, records){
    fn(records);
  });
};

Meetup.findByUser = function(userId, fn){
  meetups.find({userId:userId}).toArray(function(err, records){
    fn(records);
  });
};
