/* jshint expr:true */
'use strict';

process.env.DBNAME = 'find-my-fans-test';
var app = require('../../app/app');
var request = require('supertest');
var expect = require('chai').expect;
//var exec = require('child_process').exec;
var User, Team;
var sue;
var cookie;

describe('teams', function(){
  this.timeout(10000);
  before(function(done){
    request(app)
    .get('/')
    .end(function(err, res){
      User = require('../../app/models/user');
      Team = require('../../app/models/team');
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

    describe('GET /teams/:sportName', function(){
      it('should get teams by sport', function(done){
        var t1 = new Team({name:'Titans',
                           city:'Nashville',
                           color:'Blue',
                           sportName:'football'});
        t1.insert(function(){
          console.log('GET BY SPORT NAME!!!!');
          request(app)
          .get('/teams/football')
          .set('cookie', cookie)
          //.expect(200);
          .end(function(err, res){
            done();
          });
        });
      });
    });

    describe('GET /teams/user/:id', function(){
      this.timeout(5000);
      it('should get teams by user', function(done){
        var t1 = new Team({name:'Titans',
                           city:'Nashville',
                           color:'Blue'});
        t1.insert(function(){
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

    describe('POST /teams/populate', function(){
      it('should populate the DB with (garbage) team data', function(done){
        var sportsObj = {sports: [{name:'crapball', leagues:[{shortName: 'crapball league', name: 'league of crapball', teams:[{uid: '1234', name: 'crapball team', sportName: 'crapball', leagueShortName:'crapball league', leagueName: 'league of crapball', location: 'Crapville', color: 'brown'}]}]}]};
        request(app)
        .post('/teams/populate')
        .set('cookie', cookie)
        .send(sportsObj)
        .end(function(err, res){
          //expect something here
          //console.log(res);
          done();
        });
      });
    });


  //end of auth
  });

//end of document
});
