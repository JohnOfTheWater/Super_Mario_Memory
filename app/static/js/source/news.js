/*jshint loopfunc:true, camelcase:false */
// JADE DOCUMENTS MUST CALL SCRIPTS:
// - news.js | lodash.js | jquery.js -
(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    //$('#getNews').click(getNews);
    //getTeams();
    //setTimeout(test, 1000);

    //bug fix for missed timing on API requests
    setTimeout(prepNewsRequest, 1000);
    setTimeout(forceNews, 2500);
  }

  var newsArray = [];
  var newsString;

  //var uid = $('#uid').text();

  ///////GET NEWS///////
/*
  function getTeams(){
    var url = '/teams/user/'+uid;
    $.getJSON(url, receiveTeams);
  }

  function receiveTeams(data){
    console.log(data);
  }

  //val = undefined
  //not sure why
  function test(){
    var nhl = $('.NHL').val();
    var nba = $('.NBA').val();
    var nfl = $('.NFL').val();
    var mlb = $('.MLB').val();
    console.log('test');
    console.log(nhl);
    console.log(nba);
    console.log(nfl);
    console.log(mlb);
  }
  */

  function prepNewsRequest(){
    //simulates what data this would get
    //testing until this can be fixed
    var nfl = {id:'s:20~l:28~t:34', sport:'football'};
    var nhl = {id:'s:70~l:90~t:27', sport:'hockey'};
    var mlb = {id:'s:1~l:10~t:18', sport:'baseball'};
    var nba = {id:'s:40~l:46~t:10', sport:'basketball'};
    var temp = [nfl, nhl, mlb, nba];
    for(var i=0; i<temp.length; i++){
      getNews(temp[i]);
    }
  }

  //calls API for news data
  function getNews(data){
    var teamId = data.id;
    var chT = teamId.indexOf('t');
    teamId = teamId.substr(chT+2);
    var sport = data.sport;
    var league;
    switch(sport){
      case 'hockey':
        league='nhl';
        break;
      case 'football':
        league='nfl';
        break;
      case 'baseball':
        league='mlb';
        break;
      case 'basketball':
        league='nba';
        break;
      default:
    }
    var url = 'http://api.espn.com/v1/sports/'+sport+'/'+league+'/teams/'+teamId+'/news?apikey=cg47xhrsmt7feuzhf5b3dsjv';
    $.getJSON(url, receiveNews);
  }

  //pulls headlines array from object, flattens and shuffles
  function receiveNews(data){
    //console.log(data);
    //console.log('newsArray', newsArray);

    //weird _.flatten error, for loop is a workaround
    for(var i=0; i<data.headlines.length; i++){
      newsArray.push(data.headlines[i]);
    }
    _.shuffle(newsArray);
  }

  function forceNews(){
    for(var i=0; i<newsArray.length; i++){
      var story = newsArray[i];
      var tempString = '   ...'+story.headline+'...   ';
      newsString += tempString;
      //console.log(tempString);
    }
    sendNews(newsString);
  }

  //starts with undefined, needs to be fixed
  function sendNews(text){
    $('#newsText').text(text);
  }

})();

