/* jshint expr:true */
'use strict';

process.env.DBNAME = 'findMyFans-test';
var expect = require('chai').expect;
//var Mongo = require('mongodb');
var Game, games;

describe('Game', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      Game = require('../../app/models/game');
      games = global.nss.db.collection('games');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      done();
    });
  });

  describe('New', function(){
    it('should create a new game object', function(){
      var obj = {teams:['Rockets', 'Spurs'], city:'Houston', dateTime:'3/16/14 '}; //dateTime notation is not exact
      var game = new Game(obj);
      expect(game).to.be.instanceof(Game);
      expect(game.teams).to.have.length(2);
      expect(game.teams[0]).to.equal('Rockets');
    });
  });

  describe('#insert', function(){
    it('should add a game to the database', function(done){
      var obj = {teams:['Rockets', 'Spurs'], city:'Houston', dateTime:'3/16/14 '}; //dateTime notation is not exact
      var game = new Game(obj);
      game.insert(function(){
        expect(game._id).to.be.ok;
        done();
      });
    });
  });

  describe('#destroy', function(){
    it('should remove a game from the database', function(done){
      var obj = {teams:['Rockets', 'Spurs'], city:'Houston', dateTime:'3/16/14 '}; //dateTime notation is not exact
      var game = new Game(obj);
      game.insert(function(){
        var gameId = game._id;
        Game.destroy(gameId, function(count){
          expect(count).to.equal(1);
          done();
        });
      });
    });
  });

  describe('#update', function(){
    it('should update the game in the database', function(done){
      var obj = {teams:['Rockets', 'Spurs'], city:'Houston', dateTime:'3/16/14 '}; //dateTime notation is not exact
      var game = new Game(obj);
      game.insert(function(){
        game.city = 'San Antonio';
        game.update(function(result){
          games.findOne({_id: game._id}, function(err, record){
            expect(record.city).to.equal('San Antonio');
            done();
          });
        });
      });
    });
  });

  describe('#findById', function(){
    it('should find a game by its id', function(done){
      var obj = {teams:['Rockets', 'Spurs'], city:'Houston', dateTime:'3/16/14 '}; //dateTime notation is not exact
      var game = new Game(obj);
      game.insert(function(){
        var gameId = (game._id);
        Game.findById(gameId, function(record){
          expect(record._id).to.deep.equal(gameId);
          done();
        });
      });
    });
  });

  describe('findAll', function(){
    it('should find all games', function(done){
      var obj1 = {teams:['Rockets', 'Spurs'], city:'Houston', dateTime:'3/16/14 '}; //dateTime notation is not exact
      var game1 = new Game(obj1);
      var obj2 = {teams:['Lakers', 'Heat'], city:'Miami', dateTime:'3/17/14 '}; //dateTime notation is not exact
      var game2 = new Game(obj2);
      game1.insert(function(){
        game2.insert(function(){
          Game.findAll(function(records){
            expect(records.length).to.equal(2);
            done();
          });
        });
      });
    });
  });

  describe('#findBySportName', function(){
    it('should find all games by sport', function(done){
      var obj1 = {teams:['Rockets', 'Spurs'], city:'Houston', dateTime:'3/16/14 ', sportName:'basketball'}; //dateTime notation is not exact
      var game1 = new Game(obj1);
      var obj2 = {teams:['Texans', 'Cowboys'], city:'Dallas', dateTime:'3/17/14 ', sportName:'football'}; //dateTime notation is not exact
      var game2 = new Game(obj2);
      game1.insert(function(){
        game2.insert(function(){
          Game.findBySportName(game1.sportName, function(records){
            expect(records).to.have.length(1);
            expect(records[0].city).to.equal('Houston');
            expect(records[0]._id).to.deep.equal(game1._id);
            done();
          });
        });
      });
    });
  });

  //not geo-location, basic string matching
  describe('#findByCity', function(){
    it('should find all games by city', function(done){
      var obj1 = {teams:['Rockets', 'Spurs'], city:'Houston', dateTime:'3/16/14 ', sportName:'basketball'}; //dateTime notation is not exact
      var game1 = new Game(obj1);
      var obj2 = {teams:['Texans', 'Cowboys'], city:'Dallas', dateTime:'3/17/14 ', sportName:'football'}; //dateTime notation is not exact
      var game2 = new Game(obj2);
      game1.insert(function(){
        game2.insert(function(){
          Game.findByCity(game1.city, function(records){
            expect(records[0].city).to.equal('Houston');
            expect(records[0]._id).to.deep.equal(game1._id);
            done();
          });
        });
      });
    });
  });

  describe('findByTeam', function(){
    it('should find games with a given team.', function(done){
      var obj1 = {title:'Rockets at Spurs', teams:['Rockets', 'Spurs'], city:'Houston', dateTime:'3/16/14 ', sportName:'basketball'}; //dateTime notation is not exact
      var game1 = new Game(obj1);
      var obj2 = {title: 'Lakers at Heat', teams:['Lakers', 'Heat'], city:'Miami', dateTime:'3/17/14 ', sportName:'basketball'}; //dateTime notation is not exact
      var game2 = new Game(obj2);
      var obj3 = {title: 'Rockets at Spurs', teams:['Rockets', 'Spurs'], city:'Houston', dateTime:'3/17/14 ', sportName:'basketball'}; //dateTime notation is not exact
      var game3 = new Game(obj3);
      game1.insert(function(){
        game2.insert(function(){
          game3.insert(function(){
            Game.findByTeam('basketball', 'Rockets', function(records){
              expect(records.length).to.equal(2);
              done();
            });
          });
        });
      });
    });
  });

//End of Document
});
