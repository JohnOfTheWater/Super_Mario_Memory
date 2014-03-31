'use strict';

var User = require('../models/user');
var Team = require('../models/team');
var Note = require('../models/note');
var moment = require('moment');
//var sendEmail = require('../lib/send-email');

exports.auth = function(req, res){
  res.render('user/auth', {title:'User Authentication'});
};

exports.show = function(req, res){
  console.log('USER'+req.params.user);
  User.findByName(req.params.user, function(user){
    console.log(req.params.user);
    res.send({user:user});
  });
};

exports.create = function(req, res){
  console.log('USERS EXPORTS CREATE: ', req.body);
  var newUser = new User(req.body);
  newUser.addPhoto(req.files.photo.path, function(){
    newUser.register(function(err, body){
      if (!err){
        res.render('user/auth', {title: 'Welcome to EverN'});
      } else {
        res.render('user/auth', {title: 'Registeration Error. Try Again.'});
      }
    });
  });
};

/*
exports.create = function(req, res){
  console.log('USERS EXPORTS CREATE: ', req.body);
  var newUser = new User(req.body);
  newUser.register(function(err, body){
    if (!err){
      res.redirect('user/auth', {title: Welcome New Fan! Please Login.');
    } else {
      res.render('user/auth', {title: 'Registeration Error. Try Again.'});
    }
  });
};
*/
/*
exports.register = function(req, res){
  var used = new User(req.body);
  used.hashPassword(function(){
    console.log('after the used.hashPassword call');
    if(req.files.photo){
      used.addPhoto(req.files.photo.path, function(){
        used.save(function(ret){
          console.log('after the used.save call');
          if(ret._id){
            console.log('before the sendEmail call');
            sendEmail(req, res, {
              from: 'noreply@fakesite.com',
              to: ret.email,
              subject: 'You have registered for Find My Fans',
              text:'This is an email confirming your registration for Find My Fans. You have registered as ' + ret.name + '.'
            }, function(){
              res.redirect('/');
            });
          }else{
            res.render('user/auth');
          }
        });
      });
    }else{
      res.redirect('user/auth'); //can't create a user without a picture
    }
  });
};
*/

exports.login = function(req, res){
  console.log('inside login');
  User.findByEmailAndPassword(req.body.email, req.body.password, function(ret){
    if(ret._id){
      req.session.regenerate(function(){
        req.session.userId = ret._id.toString();
        req.session.save(function(){
          console.log('BEFORE FINDUSERBYID', req.session);
          Note.findByUserIdLimit(req.session.userId, function(notes){
            if(notes.length !== 0){
              console.log('IF, notes.length= '+notes.length);
              res.render('user/notes', {title:'EverNode', moment:moment, user:ret, notes:notes});
            }else{
              console.log('ELSE, notes.length='+notes.length);
              res.render('user/notes', {title:'EverNode', user:ret});
            }
          });
        });
      });
    }else{
      req.session.destroy(function(){
        res.send({success:false, error:'Email or password incorrect.'});
      });
    }
  });
};

/*
exports.login = function(req, res){
  console.log('inside login');
  User.findByEmailAndPassword(req.body.email, req.body.password, function(user){
    if(user._id){
      req.session.regenerate(function(){
        req.session.userId = user._id.toString();
        req.session.save(function(){

          //takes user to home if they have selected teams/none
          //otherwise takes user to edit profile page
          if(user.teams.length>0){
            res.redirect('/');
          }else{
            res.redirect('/profile');
          }
        });
      });
    }else{
      req.session.destroy(function(){
        res.send({success:false, error:'Email or password incorrect.'});
      });
    }
  });
};
*/
exports.logout = function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  });
};

exports.showProfile = function(req, res){
  var NFLTeams, NHLTeams, MLBTeams, NBATeams;
  Team.findBySportName('football', function(teams){
    NFLTeams = teams;
    Team.findBySportName('hockey', function(teams){
      NHLTeams = teams;
      Team.findBySportName('baseball', function(teams){
        MLBTeams = teams;
        Team.findBySportName('basketball', function(teams){
          NBATeams = teams;
          res.render('user/editProfile', {title:'The title passed in by the route', NFLTeams:NFLTeams, NHLTeams:NHLTeams, MLBTeams:MLBTeams, NBATeams:NBATeams});
        });
      });
    });
  });
};

exports.updateUserInfo = function(req, res){
  var id = req.session.userId;
  User.findById(id, function(foundUser){
    foundUser = new User(foundUser);
    User.dupeCheckEmail(req.body.email, function(dupeOkayEmail){
      if (!dupeOkayEmail.response && (dupeOkayEmail.failedOn.toString() === foundUser._id.toString())){
        console.log('Successfully ignored a dupe on the email address.');
        dupeOkayEmail.response = true;
      } else {
        console.log('Failed on a dupe email address and/or the user IDs did not match.');
      }
      User.dupeCheckName(req.body.name, function(dupeOkayName){
        if (!dupeOkayName.response && (dupeOkayName.failedOn.toString() === foundUser._id.toString())){
          console.log('Successfully ignored a dupe on the name.');
          dupeOkayName.response = true;
        } else {
          console.log('Failed on a dupe user name and/or the user IDs did not match.');
        }
        var finalOkay = dupeOkayEmail.response && dupeOkayName.response;
        if (finalOkay){
          if (req.body.name){ //if the user didn't put in a name then this won't be executed
            foundUser.name = req.body.name;
          }
          if (req.body.email){
            foundUser.email = req.body.email;
          }
          foundUser.update(function(){
            res.redirect('/');
          });
        } else {
          res.redirect('/profile'); //need a better way of telling the user that the change didn't work
        }
      });
    });
  });
};

exports.updateFavoriteTeams = function(req, res){
  var id = req.session.userId;
  var newTeams = [];
  User.findById(id, function(foundUser){
    foundUser = new User(foundUser);
    for (var x in req.body){
      if (req.body[x] !== 'noTeam'){
        newTeams.push(req.body[x]);
      }
    }
    foundUser.teams = newTeams;
    foundUser.update(function(){
      res.redirect('/profile');
    });
  });
};

/*
exports.show = function(req, res){
  User.findById(req.params.id, function(user){
    res.render('users/show', {validUser:user});
  });
};
*/
