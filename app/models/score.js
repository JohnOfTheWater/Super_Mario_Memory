'use strict';

module.exports = Score;
var Mongo = require('mongodb');
//var _ = require('lodash');
var scores = global.nss.db.collection('scores');
//var fs = require('fs');
//var path = require('path');
//var User = require('../models/user');

function Score(score){
  this.name = score.name;
  this.points = score.points;
  //this.sample = note.body.substr(0, 41);
  this.date = score.date ? new Date(score.date) : new Date();
  //this.photo = note.photo || [];
  //this.lat = note.lat;
  //this.lng = note.lng;
}

Score.prototype.insert = function(fn){
  //var self = this;

  scores.insert(this, function(err, count){
    fn(count);
  });
};

Score.findHiScores = function(fn){
  scores.find().sort({points:-1}).limit(5).toArray(function(err, records){
    fn(records);
  });
};

Score.findByUserIdLimit = function(userId, fn){
  userId = Mongo.ObjectID(userId);

  scores.find({userId:userId}).sort({_id:-1}).limit(9).toArray(function(err, records){
    fn(records);
  });
};

Score.findByUserId = function(userId, fn){
  userId = Mongo.ObjectID(userId);

  scores.find({userId:userId}).toArray(function(err, records){
    fn(records);
  });
};

Score.findById = function(id, fn){
  var _id = Mongo.ObjectID(id);

  scores.findOne({_id:_id}, function(err, record){
    console.log('inside model: '+record.title);
    fn(record);
  });
};

Score.prototype.update = function(id, fn){
  var _id = Mongo.ObjectID(id);

  scores.update({_id:_id}, this, function(err, count){
    fn(count);
  });
};

Score.updateBody = function(id, body, fn){
  var _id = Mongo.ObjectID(id);
  var samplex = body.substr(0, 41);

  scores.update({_id:_id}, {$set: {body:body, sample:samplex}}, function(err, count){
    fn(count);
  });
};

Score.findByDate = function(userId, date, fn){
  userId = Mongo.ObjectID(userId);
  //date = new Date(date);
  console.log('after new Date(date): '+date);

  scores.find({userId:userId, dateCreated: new Date(date)}).toArray(function(err, records){
    fn(records);
  });
};

// db.notes.find( { userId:userId,  tags: {$in: ["fun"] }}
Score.findByTags = function(userId, tags, fn){
  userId = Mongo.ObjectID(userId);
  //tags = tags.substr(0, 3);
  console.log('inside model after substr(): '+tags);

  scores.find({userId:userId, tags: {$in: [tags]}}).toArray(function(err, records){
    fn(records);
  });
};

Score.findByTitle = function(userId, title, fn){
  console.log('title: '+title);
  userId = Mongo.ObjectID(userId);

  scores.find({userId:userId, title:title}).toArray(function(err, records){
    fn(records);
  });
};

Score.findAlpha = function(userId, fn){
  userId = Mongo.ObjectID(userId);

  scores.find({userId:userId}).sort({title:1}).toArray(function(err, records){
    fn(records);
  });
};

Score.findDate = function(userId, fn){
  userId = Mongo.ObjectID(userId);

  scores.find({userId:userId}).sort({dateCreated:1}).toArray(function(err, records){
    fn(records);
  });
};

Score.findByIdAndDelete = function(id, fn){
  var _id = Mongo.ObjectID(id);

  scores.remove({_id:_id}, function(err, count){
    fn(count);
  });
};

/*
Note.prototype.addPhoto = function(oldpath, fn){
  console.log('oldpath: '+oldpath);
  var self = this;
  var random = _.random(0, 1000);
  User.findById(this.userId.toString(), function(ret){
    var email = ret.email.replace(/@/g, '');
    email = email.replace(/\./g, '').toLowerCase();
    var name = ret.name.replace(/\s/g , '');
    name = name.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase();
    var dirname = email + '/' + name;
    var abspath = __dirname + '/../static';
    console.log('abspath: '+abspath);
    var extension = path.extname(oldpath);
    var newOldPath = oldpath.substr(6, 10);
    newOldPath = random + newOldPath;
    console.log('newOldPath: '+newOldPath);
    var ext = newOldPath + extension;
    var relpath = '/img/' + dirname;
    var newpath = relpath + '/' + ext;
    fs.mkdir(abspath + relpath, function(){
      fs.rename(oldpath, abspath + newpath, function(){

        self.photo.push(newpath);
        fn();
      });
    });
  });
};

Note.prototype.addAudio = function(oldpath, fn){
  console.log('oldpath: '+oldpath);
  var self = this;
  User.findById(this.userId.toString(), function(ret){
    var email = ret.email.replace(/@/g, '');
    email = email.replace(/\./g, '').toLowerCase();
    var name = ret.name.replace(/\s/g , '');
    name = name.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase();
    var dirname = email + '/' + name;
    var abspath = __dirname + '/../static';
    var extension = path.extname(oldpath);
    var newOldPath = oldpath.substr(6, 10);
    console.log('changedOldpath: '+newOldPath);
    var ext = newOldPath + extension;
    var relpath = '/img/' + dirname;
    var newpath = relpath + '/' + ext;
    fs.mkdir(abspath + relpath, function(){
      fs.rename(oldpath, abspath + newpath, function(){

        self.audio.push(newpath);
        fn();
      });
    });
  });
};

Note.prototype.addMyPhoto = function(oldpath, fn){
  console.log('oldpath: '+oldpath);
  var self = this;
  User.findById(this.userId.toString(), function(ret){
    var email = ret.email.replace(/@/g, '');
    email = email.replace(/\./g, '').toLowerCase();
    var name = ret.name.replace(/\s/g , '');
    name = name.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase();
    var dirname = email + '/' + name;
    var abspath = __dirname + '/../static';
    var extension = path.extname(oldpath);
    var newOldPath = oldpath.substr(6, 10);
    console.log('changedOldpath: '+newOldPath);
    var ext = newOldPath + extension;
    var relpath = '/img/' + dirname;
    var newpath = relpath + '/' + ext + '.jpg';
    fs.mkdir(abspath + relpath, function(){
      fs.rename(oldpath, abspath + newpath, function(){

        self.photo.push(newpath);
        fn();
      });
    });
  });
};

Note.encode = function(dataUrl, fn){
  var dataString = dataUrl.split(',')[1];
  var buffer = new Buffer(dataString, 'base64');
  var extension = dataUrl.match(/\/(.*)\;/)[1];
  var fullFileName = 'userWebcamPic.' + extension;
  fs.writeFileSync(fullFileName, buffer, 'binary');
  fn(fullFileName);
};
*/
