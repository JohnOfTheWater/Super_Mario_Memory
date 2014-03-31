/* jshint expr:true */

'use strict';

process.env.DBNAME = 'Lapis-Test';
var expect = require('chai').expect;
var Mongo = require('mongodb');
var Note, User, u1;
var fs = require('fs');
var exec = require('child_process').exec;
//var sue;
//var bob;

describe('Note', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      Note = require('../../app/models/note');
      User = require('../../app/models/user');
      done();
    });
  });

  beforeEach(function(done){
    var testdir = __dirname + '/../../app/static/img/gmailcom/prof*';
    var cmd = 'rm ' + testdir;
    exec(cmd, function(){
      var origfile = __dirname + '/../fixtures/testpic.jpg';
      var copyfile = __dirname + '/../fixtures/testpic-copy.jpg';
      fs.createReadStream(origfile).pipe(fs.createWriteStream(copyfile));
      global.nss.db.dropDatabase(function(err, result){
        u1 = new User({name: 'Sue', email:'BEFOREEACH@gmail.com', password:'678utf', photo:'img.gif', description:'my name is sue', teams:['Nashville Predators'], home:'Nashville, TN'});
        u1.register(function(err, body){
          done();
        });
      });
    });
  });
/*
  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      done();
    });
  });
*/
  describe('new', function(){
    it('should create a new Note object', function(){
      var n1 = new Note({title:'Node', body:'node info', dateCreated:'2014-03-24', tags:'hw, prog, code'});
      expect(n1).to.be.instanceof(Note);
      expect(n1.title).to.equal('Node');
      expect(n1.body).to.equal('node info');
      expect(n1.dateCreated).to.be.instanceof(Date);
      expect(n1.tags).to.have.length(3);
    });
    it('should create a new Note with empty data object', function(){
      var n1 = new Note({title:'JS', body:'js info', dateCreated:'', tags:''});
      var d1 = new Date();
      expect(n1).to.be.instanceof(Note);
      expect(n1.title).to.equal('JS');
      expect(n1.body).to.equal('js info');
      expect(n1.dateCreated).to.be.instanceof(Date);
      expect(n1.dateCreated.toDateString()).to.equal(d1.toDateString());
      expect(n1.tags).to.have.length(0);
    });
  });

  describe('#insert', function(){
    it('should insert a new Note object', function(done){
      var n1 = new Note({title:'Node', body:'node info', dateCreated:'2014-03-24', tags:'hw, prog, code'});
      n1.insert(function(){
        expect(n1._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('findByUserId', function(){
    beforeEach(function(done){
      var n1 = new Note({title:'Node', body:'node info', dateCreated:'2014-03-24', tags:'hw, prog, code', userId:u1._id.toString()});
      var n2 = new Note({title:'JS', body:'js info', dateCreated:'2012-07-18', tags:'code, js, hacking', userId:u1._id.toString()});
      n1.insert(function(){
        n2.insert(function(){
          done();
        });
      });
    });

    it('should find a user by her id', function(done){
      Note.findByUserId(u1._id.toString(), function(notes){
        expect(notes).to.have.length(2);
        expect(notes[0].title).to.equal('Node');
        done();
      });
    });
  });


//---end---//
});
