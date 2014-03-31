'use strict';

var d = require('../lib/request-debug');
var initialized = false;

module.exports = function(req, res, next){
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = require('../routes/home');
  var users = require('../routes/users');
  var notes = require('../routes/notes');
  var teams = require('../routes/teams');
  var games = require('../routes/games');
  var meetups = require('../routes/meetups');

  //-----Reg/Login--------//
  app.get('/', d, home.index);
  //-----Test--------//
  app.get('/test', d, home.test);
  //-----endTest--------//
  app.get('/admin/get-teams', d, teams.getTeams);
  app.get('/auth', d, users.auth);
  app.post('/auth', d, users.create);
  app.get('/login', d, home.login);
  app.post('/login', d, users.login);
  app.post('/logout', d, users.logout);
  //-----notes--------//
  app.get('/notes', d, notes.index);
  //-----sort notes--------//
  app.get('/notesByDate', d, notes.sortByDate);
  app.get('/notesByAlpha', d, notes.sortByAlpha);
  //-----find notes--------//
  app.get('/note/:id', d, notes.show);
  app.get('/notePictures/:id', d, notes.immagini);
  app.get('/noteAudio/:id', d, notes.audio);
  app.get('/fullNote/:id', d, notes.fullNote);
  app.get('/noteTitle/:title', d, notes.searchByTitle);
  app.get('/noteDate/:date', d, notes.searchByDate);
  app.get('/noteTags/:tags', d, notes.searchByTags);
  app.put('/note/:id', d, notes.updateBody);
  app.del('/deleteNote/:id', d, notes.destroyNote);
  app.post('/notes', d, notes.create);
  //-------uploadFiles----------//
  app.post('/noteAddPic/:id', d, notes.addPic);
  app.post('/noteAddFullPic/:id', d, notes.addFullPic);
  app.post('/noteAddFullAudio/:id', d, notes.addFullAudio);
  app.post('/webcam/:id', d, notes.webcamPic);
  //-------uploadFiles----------//
  app.get('/profile', d, users.showProfile);
  app.post('/updateUserInfo', d, users.updateUserInfo);
  app.post('/updateFavorites', d, users.updateFavoriteTeams);
  app.get('/team/:id', d, teams.getTeamById);
  app.get('/teamName/:name', d, teams.getTeamByName);
  app.post('/teams/populate', d, teams.populate);
  app.get('/teams/user/:id', d, teams.index);
  app.get('/teams/:sportName', d, teams.showBySport);
  app.post('/teams', d, teams.insert);
  app.get('/meetups', d, meetups.show);
  app.get('/meetups/create-meetup', d, meetups.createMeetup);
  app.post('/meetups', d, meetups.create);
  app.get('/meetups/:id', d, meetups.showMeetup);
  app.post('/games/populate', d, games.populate);
  //app.get('/games/user/:id', d, games.showByUser);
  app.get('/games/:sportName', d, games.showBySport);
  app.get('/games/byteam/:sportName/:teamLongName', d, games.showByTeam);
  console.log('Routes Loaded');
  fn();
}


