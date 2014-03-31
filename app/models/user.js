'use strict';

var bcrypt = require('bcrypt');
var Mongo = require('mongodb');
//var _ = require('lodash');
var User;
var users = global.nss.db.collection('users');
var fs = require('fs');
var path = require('path');
var email = require('../lib/send-email');

module.exports = User;
function User(user){
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
  this.photo = user.photo;
}

User.prototype.register = function(fn){
  var self = this;
  hashPassword(self.password, function(hashed){
    self.password = hashed;
    User.dupeCheckEmail(self.email, function(dupeResult){
      if (dupeResult.response){ //dupeCheck will return true on .response if there is NOT a duplicate email in the DB
        User.dupeCheckName(self.name, function(dupeResult){
          if (dupeResult.response){
            insert(self, function(err, inserted){
              email.sendWelcome({to:self.email, name:self.name}, function(err, body){
                fn(err, body);
              });
            });
          } else {
            fn('You tried to register a duplicate user (failed because of duplicate name).');
          }
        });
      } else {
        fn('You tried to register a duplicate user (failed because of duplicate email).');
      }
    });
  });
};

function hashPassword(password, fn){
  bcrypt.hash(password, 8,function(err, hash){
    fn(hash);
  });
}

/*
User.dupeCheck = function(email, name, fn){
  users.findOne({email: email}, function(err, foundUser){
    users.findOne({name:name}, function(err, foundUser2){
      if (foundUser === null && foundUser2 === null){
        fn({response: true});
      } else if (foundUser2 !== null && foundUser === null) {
        console.log('dupeCheck failed on this user name:', name);
        fn({response:false, failedOn2:foundUser2._id});
      } else if (foundUser2 === null && foundUser !== null) {
        console.log('dupeCheck failed on this email address:', email);
        fn({response:false, failedOn:foundUser._id});
      } else {
        console.log('dupeCheck double-failed on', name, 'and', email);
        fn({response:false, failedOn:foundUser._id, failedOn2:foundUser2._id});
      }
    });
  });
};
*/

User.dupeCheckEmail = function(email, fn){
  users.findOne({email:email}, function(err, foundUser){
    if (foundUser === null){
      fn({response:true});
    } else {
      fn({response:false, failedOn:foundUser._id});
    }
  });
};

User.dupeCheckName = function(name, fn){
  users.findOne({name:name}, function(err, foundUser){
    if (foundUser === null){
      fn({response:true});
    } else {
      fn({response:false, failedOn:foundUser._id});
    }
  });
};

function insert(user, fn){
  users.insert(user, function(err, record){
    fn(err);
  });
}

/*
User.prototype.save = function(fn){
  var self = this;
  users.findOne({email: self.email}, function(err, record){
    if(!record){
      users.findOne({name: self.name}, function(err, record){
        if(!record){
          users.insert(self, function(err, result){
            fn(result[0]);
          });
        }else{
          fn(false);
        }
      });
    }else{
      fn(false);
    }
  });
};
*/

User.findById = function(id, fn){
  if(id !== undefined){id = id.toString();}
  var _id = new Mongo.ObjectID(id);
  users.findOne({_id:_id}, function(err, record){
    fn(record);
  });
};

User.findByName = function(name, fn){
  users.findOne({name:name}, function(err, record){
    fn(record);
  });
};

User.findByEmailAndPassword = function(email, password, fn){
  users.findOne({email:email}, function(err, record){
    if(record){
      bcrypt.compare(password, record.password, function(err, result){
        if(result){
          fn(record);
        }else{
          fn(false);
        }
      });
    }else{
      fn(false);
    }
  });
};

User.findByEmail = function(email, fn){
  users.findOne({email:email}, function(err, record){
    fn(record);
  });
};

User.prototype.update = function(fn){
  var self = this;
  users.update({_id:this._id}, this, function(err, count){
    User.findById(self._id.toString(), function(record){
      fn(record);
    });
  });
};

User.prototype.addPhoto = function(oldpath, fn){
  var self = this;
  var email = this.email.replace(/@/g, '');
  email = email.replace(/\./g, '').toLowerCase();
  var dirname = email;
  var abspath = __dirname + '/../static';
  var extension = path.extname(oldpath);
  var ext = 'profile' + extension;
  var relpath = '/img/' + dirname;
  var newpath = relpath + '/' + ext;
  fs.mkdir(abspath + relpath, function(err){
    fs.rename(oldpath, abspath + newpath, function(){
      self.photo = newpath;
      fn();
    });
  });
};
