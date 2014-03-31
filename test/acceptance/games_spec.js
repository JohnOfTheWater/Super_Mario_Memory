/* jshint expr:true */
'use strict';

process.env.DBNAME = 'team2-test';
var app = require('../../app/app');
var request = require('supertest');
//var expect = require('chai').expect;
//var exec = require('child_process').exec;
var User, Team, Game;
var sue;
var cookie;

describe('games', function(){
  before(function(done){
    request(app)
    .get('/')
    .end(function(err, res){
      User = require('../../app/models/user');
      Team = require('../../app/models/team');
      Game = require('../../app/models/game');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      sue = new User({email:'sue@nomail.com', password:'abcd', teams:[]});
      sue.register(function(err){
        done();
      });
    });
  });

  /*
  describe('GET /teams', function(){
    it('should get not teams because not logged in', function(done){
      request(app)
      .get('/teams/user/'+sue._id)
      .expect(302, done);
      console.log(res.body);
    });
  });
*/

  describe('AUTHORIZED', function(){
    beforeEach(function(done){
      request(app)
      .post('/login')
      .field('email', 'sue@nomail.com')
      .field('password', 'abcd')
      .end(function(err, res){
        cookie = res.headers['set-cookie'];
        done();
      });
    });

    describe('GET /games/:sportName', function(){
      it('should get games by sport', function(done){
        var obj1 = {teams:['Rockets', 'Spurs'], city:'Houston', dateTime:'3/16/14 ', sportName:'basketball'}; //dateTime notation is not exact
        var game1 = new Game(obj1);
        game1.insert(function(){
          console.log(game1);
          console.log('GET BY SPORT NAME!!!!');
          request(app)
          .get('/games/basketball')
          .set('cookie', cookie)
          //.expect(200);
          .end(function(err, res){
            console.log(res.body);
            done();
          });
        });
      });
    });

/*
    describe('GET /games/user/:id', function(){
      it('should get games by user', function(done){
        var obj1 = {teams:['Rockets', 'Spurs'], city:'Houston', dateTime:'3/16/14 ', sportName:'basketball'}; //dateTime notation is not exact
        var game1 = new Game(obj1);
        game1.insert(function(){
          sue.teams = [t1._id];
          sue.update(function(){
            request(app)
            .get('/teams/user/'+sue._id)
            .set('cookie', cookie)
            .end(function(err, res){
              done();
            });
          });
        });
      });
    });

    describe('POST /teams', function(){
      it('should insert a new team object in the db', function(done){
        var t1 = new Team({name:'Titans',
                           city:'Nashville',
                           color:'Blue'});
        request(app)
        .post('/teams')
        .send(t1)
        .set('cookie', cookie)
        .end(function(err, res){
          expect(404);
          done();
        });
        //.expect(404, done);
      });
    });
*/
  //end of auth
  });

//end of document
});
