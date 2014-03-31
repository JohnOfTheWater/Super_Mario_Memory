'use strict';

module.exports = function(req, res, next){
  var user = res.locals.user;

  console.log('GET GAMES EXPORTS: ', user);

};
