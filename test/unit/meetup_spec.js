/* jshint expr:true */
'use strict';

process.env.DBNAME = 'find-my-fans-test';
var expect = require('chai').expect;
//var Mongo = require('mongodb');
var Meetup, meetups;
var Game, games;
var g1, g2;
//var Team, teams;

describe('Team', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      Meetup = require('../../app/models/meetup');
      meetups = global.nss.db.collection('meetups');
      Game = require('../../app/models/game');
      games = global.nss.db.collection('games');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      var obj1 = {teams:['Rockets', 'Spurs'], city:'Houston', dateTime:'3/16/14', sportName:'basketball'}; //dateTime notation is not exact
      g1 = new Game(obj1);
      var obj2 = {teams:['Lakers', 'Heat'], city:'Miami', dateTime:'3/17/14', sportName:'basketball'}; //dateTime notation is not exact
      g2 = new Game(obj2);
      g1.insert(function(){
        g2.insert(function(){
          expect(g1._id).to.be.ok;
          expect(g2._id).to.be.ok;
          done();
        });
      });
    });
  });

  describe('New', function(){
    it('should create a new  object', function(){
      var obj = {gameId:g1._id, userId:'123456789123456789123456', teams:g1.teams, sportName:g1.sportName};
      var meetup = new Meetup(obj);
      expect(meetup).to.be.instanceof(Meetup);
    });
  });

  describe('#insert', function(){
    it('should add meetup to the database', function(done){
      var obj = {gameId:g1._id, userId:'123456789123456789123456', teams:g1.teams, sportName:g1.sportName};
      var meetup = new Meetup(obj);
      meetup.insert(function(){
        expect(meetup._id).to.be.ok;
        done();
      });
    });
  });

  describe('#destroy', function(){
    it('should remove a meetup from the database', function(done){
      var obj = {gameId:g1._id, userId:'123456789123456789123456', teams:g1.teams, sportName:g1.sportName};
      var meetup = new Meetup(obj);
      meetup.insert(function(){
        var meetupId = meetup._id;
        Meetup.destroy(meetupId, function(count){
          expect(count).to.equal(1);
          done();
        });
      });
    });
  });

  describe('#update', function(){
    it('should update the meetup in the database', function(done){
      var obj = {gameId:g1._id, userId:'123456789123456789123456', teams:g1.teams, sportName:g1.sportName};
      var meetup = new Meetup(obj);
      meetup.insert(function(){
        meetup.teams[0] = 'Bulls';
        meetup.update(function(result){
          meetups.findOne({_id: meetup._id}, function(err, record){
            expect(record.teams[0]).to.equal('Bulls');
            done();
          });
        });
      });
    });
  });

  describe('#findById', function(){
    it('should find a meetup by its id', function(done){
      var obj = {gameId:g1._id, userId:'123456789123456789123456', teams:g1.teams, sportName:g1.sportName};
      var meetup = new Meetup(obj);
      meetup.insert(function(){
        var meetupId = (meetup._id);
        Meetup.findById(meetupId, function(record){
          expect(record._id).to.deep.equal(meetupId);
          done();
        });
      });
    });
  });

  describe('findAll', function(){
    it('should find all meetups', function(done){
      var obj1 = {gameId:g1._id, userId:'123456789123456789123456', teams:g1.teams, sportName:g1.sportName};
      var meetup1 = new Meetup(obj1);
      var obj2 = {gameId:g2._id, userId:'123456789123456789123456', teams:g2.teams, sportName:g1.sportName};
      var meetup2 = new Meetup(obj2);
      meetup1.insert(function(){
        meetup2.insert(function(){
          Meetup.findAll(function(records){
            expect(records.length).to.equal(2);
            done();
          });
        });
      });
    });
  });

  describe('#findBySportName', function(){
    it('should find all meetups by sport', function(done){
      var obj1 = {gameId:g1._id, userId:'123456789123456789123456', teams:g1.teams, sportName:g1.sportName};
      var meetup1 = new Meetup(obj1);
      var obj2 = {gameId:g2._id, userId:'123456789123456789123456', teams:g2.teams, sportName:g1.sportName};
      var meetup2 = new Meetup(obj2);
      meetup1.insert(function(){
        meetup2.insert(function(){
          Meetup.findBySportName(meetup1.sportName, function(records){
            expect(records).to.have.length(2);
            done();
          });
        });
      });
    });
  });

  describe('findByTeam', function(){
    it('should find meetups with a given team.', function(done){
      var obj1 = {gameId:g1._id, userId:'123456789123456789123456', teams:g1.teams, sportName:g1.sportName};
      var meetup1 = new Meetup(obj1);
      var obj2 = {gameId:g2._id, userId:'123456789123456789123456', teams:g2.teams, sportName:g1.sportName};
      var meetup2 = new Meetup(obj2);
      meetup1.insert(function(){
        meetup2.insert(function(){
          Meetup.findByTeam('Rockets', function(records){
            expect(records.length).to.equal(1);
            done();
          });
        });
      });
    });
  });

  describe('#findByCity', function(){
    it('should find meetups by city', function(done){
      var obj = {gameId:g1._id, userId:'123456789123456789123456', teams:g1.teams, sportName:g1.sportName, city:g1.city};
      var meetup = new Meetup(obj);
      meetup.insert(function(){
        Meetup.findByCity(meetup.city, function(records){
          expect(records).to.have.length(1);
          expect(records[0].city).to.equal('Houston');
          expect(records[0]._id).to.deep.equal(meetup._id);
          done();
        });
      });
    });
  });

  describe('#findByUser', function(){
    it('should find all meetups by user', function(done){
      var obj1 = {gameId:g1._id, userId:'123456789123456789123456', teams:g1.teams, sportName:g1.sportName};
      var meetup1 = new Meetup(obj1);
      var obj2 = {gameId:g2._id, userId:'123456789123456789123456', teams:g2.teams, sportName:g1.sportName};
      var meetup2 = new Meetup(obj2);
      meetup1.insert(function(){
        meetup2.insert(function(){
          Meetup.findByUser(meetup1.userId, function(records){
            expect(records).to.have.length(2);
            expect(records[0].userId).to.deep.equal(meetup1.userId);
            expect(records[1].userId).to.deep.equal(meetup1.userId);
            done();
          });
        });
      });
    });
  });

//End of Document
});
