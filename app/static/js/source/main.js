(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#showM').click(showMeetupPanel);
    $('#close').click(closeMeetupPanel);
    $('#sportGames').change(pickSport);
    $('#teamGames').change(pickTeam);
    $('#upcomingGames').change(pickGame);
    $('#meetup-submit').click(submitMeetup);
  }

  function showMeetupPanel(){
    $('#createMeetup').animate({margin:'+0 +0 +0 +550'},1000);
  }

  function closeMeetupPanel(){
    $('#createMeetup').animate({margin:'+0 +0 +0 +0'},1000);
  }

  function pickSport(){
    $('#teamGames').empty();
    $('#upcomingGames').empty();
    $('#loyalty').empty();
    var $option = $('<option>');
    $option.text('-- Pick a Team --');
    $('#teamGames').append($option);

    var sport = $('#sportGames').val();
    var url = '/teams/' + sport;
    $.getJSON(url, appendTeams);
    console.log('getJSON url:' + url );
  }
/*

  function appendTeams(data){
    $('#team').empty();
    var teams = data.teams;
    for(var i=0; i<teams.length; i++){
      var teamData = teams[i];
      var $team = $('<option>');
      $team.text(teamData.name);
      $team.val(teamData._id);
      $('#team').val($team);
      $('#team').append($team);
    }
  }
*/

  function appendTeams(data){
    var teams = data.teams;
    var $teamSelect = $('#teamGames');

    _.each(teams, function(team){
      var $option = $('<option>');
      $option.val(team.longName);
      $option.text(team.longName);
      $option.attr('data-sport', team.sportName);
      $option.attr('data-id', team._id);
      $teamSelect.append($option);
    });
    console.log('appendTeams: ', teams);
  }

  function pickTeam(){
    $('#upcomingGames').empty();
    $('#loyalty').empty();
    var $option = $('<option>');
    $option.text('-- Pick a Game --');
    $('#upcomingGames').append($option);

    var sport = $('#teamGames > option:selected').attr('data-sport');
    var team = $('#teamGames').val();
    var url = '/games/byteam/' + sport + '/' + team;
    console.log('pickTeam: ', url);
    $.getJSON(url, appendGames);
  }

  function appendGames(data){

    console.log('appendGames ', data);
    var games = data.games;
    var $gameSelect = $('#upcomingGames');

    _.each(games, function(game){
      var $option = $('<option>');
      $option.val(game.title);
      $option.text(game.shortTitle);
      $option.attr('data-id', game._id);
      $option.attr('data-sport', game.sportName);
      $gameSelect.append($option);

    });
  }

  function pickGame(){
    $('#loyalty').empty();
    var $option = $('<option>');
    $option.text('-- I root for the --');
    $('#loyalty').append($option);

    var game = $('#upcomingGames > option:selected').text();
    var team1 = game.split(' at ')[0];
    var team2 = game.split(' at ')[1];
    var $option1 = $('<option>');
    var $option2 = $('<option>');
    var $loyaltySelect = $('#loyalty');

    $option1.val(team1);
    $option1.text(team1);
    $option2.val(team2);
    $option2.text(team2);
    $loyaltySelect.append($option1);
    $loyaltySelect.append($option2);
  }

  function submitMeetup(event){
    var gameId = $('#upcomingGames > option:selected').attr('data-id');
    var teams = $('#upcomingGames > option:selected').val().split(' at ');
    var sportName = $('#upcomingGames > option:selected').attr('data-sport');
    var loyalty = $('#loyalty').val();
    var place = $('#meetupAddress').val();
    var url = 'meetups/';
    var type = 'POST';
    var success = meetupSubmitted;
    var data = {gameId:gameId, teams:teams, sportName:sportName, loyalty:loyalty, place:place};

    $.ajax({url:url, type:type, data:data, success:success});

    event.preventDefault();
    console.log('submitMeetup: ', gameId, teams, sportName, loyalty, place);
  }

  function meetupSubmitted(){
    console.log('meetupSubmitted');
  }
})();

