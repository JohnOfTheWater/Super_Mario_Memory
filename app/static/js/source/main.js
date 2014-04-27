(function(){

  'use strict';
  $(document).ready(init);

  function init(){
    $('#nice').hide();
    $('#tooBad').hide();
    $('#plus500').hide();
    $('#minus500').hide();
    $('#gameOver').hide();
    $('#excellent').hide();
    $('#enterScore').hide();
    $('#scoriAlti').hide();
    $('#start').click(randomize);
    $('#start').click(setScore);
    $('#submit').click(submitScore);
    $('#start').click(reset);
    $('#checkHiScore').click(showHiScore);
    $('#hiScore').click(hiScore);
    $('#closeScori').click(closeHiScore);
    $('#grid').on('click', '.box', reveal);
    $('#reset').click(reset);
  }

  var score = 10000;
  var picks = [];
  var counter = 0;
  var randLinks;
  var links = ['/img/babyPeach.png','/img/marioFly.png','/img/Goomba.jpg','/img/yellowTurtle.png','/img/waligi.jpg','/img/wario.jpg','/img/toad.png','/img/bowser.png','/img/drybones.jpeg','/img/nessSmash.png','/img/falcon.jpg','/img/kirby.jpg','/img/pikachu.jpg','/img/pinkBall.jpg','/img/starFox.jpg','/img/link.jpg','/img/donkeyKong.jpg','/img/samus.jpg','/img/yoshi.jpg','/img/luigi.jpg','/img/mario.jpg'];

  function setScore(){
    $('#score').text('- '+score+' -');
  }

  function rand(){
    return Math.floor(Math.random() * links.length);
  }

  function reset(){
      $('.show').removeClass('show').addClass('box').text('').removeAttr('src');
      links = ['/img/babyPeach.png','/img/marioFly.png','/img/Goomba.jpg','/img/yellowTurtle.png','/img/waligi.jpg','/img/wario.jpg','/img/toad.png','/img/bowser.png','/img/drybones.jpeg','/img/nessSmash.png','/img/falcon.jpg','/img/kirby.jpg','/img/pikachu.jpg','/img/pinkBall.jpg','/img/starFox.jpg','/img/link.jpg','/img/donkeyKong.jpg','/img/samus.jpg','/img/yoshi.jpg','/img/luigi.jpg','/img/mario.jpg'];
      //links = ['http://10.0.0.11:3001/media/babyPeach.png','http://10.0.0.11:3001/media/marioFly.png','http://10.0.0.11:3001/media/Goomba.jpg','http://10.0.0.11:3001/media/yellowTurtle.png','http://10.0.0.11:3001/media/waligi.jpg','http://10.0.0.11:3001/media/wario.jpg','http://10.0.0.11:3001/media/toad.png','http://10.0.0.11:3001/media/bowser.png','http://10.0.0.11:3001/media/drybones.jpeg','http://10.0.0.11:3001/media/nessSmash.png','http://10.0.0.11:3001/media/falcon.jpg','http://10.0.0.11:3001/media/kirby.jpg','http://10.0.0.11:3001/media/pikachu.jpg','http://10.0.0.11:3001/media/pinkBall.jpg','http://10.0.0.11:3001/media/starFox.jpg','http://10.0.0.11:3001/media/link.jpg','http://10.0.0.11:3001/media/donkeyKong.jpg','http://10.0.0.11:3001/media/samus.jpg','http://10.0.0.11:3001/media/yoshi.jpg','http://10.0.0.11:3001/media/luigi.jpg','http://10.0.0.11:3001/media/mario.jpg'];
      //links = ['http://images3.wikia.nocookie.net/__cb20120107183334/nintendo/en/images/e/ec/Baby_Peach_MSS.png','http://static4.wikia.nocookie.net/__cb20111108011934/mario/images/2/2f/Mario_NSMBW-3.png','http://static2.wikia.nocookie.net/__cb20130510012056/icarly/images/9/91/Goomba.jpg','http://www.mariowiki.com/images/thumb/3/30/KoopatroopaNSMBU.png/270px-KoopatroopaNSMBU.png','http://1.bp.blogspot.com/-LFaRUswKbsw/Tqa3tmTumVI/AAAAAAAAABs/arRvB-GVRw4/s340/waligi.jpg','http://oyster.ignimgs.com/wordpress/write.ign.com/75005/2011/10/wario-ware-smooth-moves-20060509003133378_640w-150x150.jpg','http://static3.wikia.nocookie.net/__cb20121106012758/mario/images/1/1e/Toad,_New_Super_Mario_Bros._Wii.png','http://static1.wikia.nocookie.net/__cb20130611184324/ssb/images/1/15/Bowser4.png','http://oyster.ignimgs.com/mediawiki/apis.ign.com/new-super-mario-bros-u/thumb/3/3f/MP7_DryBones.jpeg/228px-MP7_DryBones.jpeg','http://www.mariowiki.com/images/1/1c/NessSmash.PNG','http://images1.fanpop.com/images/image_uploads/Smash-N64-Characters-super-smash-brothers-807472_100_195.jpg','http://images1.fanpop.com/images/image_uploads/Smash-N64-Characters-super-smash-brothers-807464_115_102.jpg','http://images1.fanpop.com/images/image_uploads/Smash-N64-Characters-super-smash-brothers-807457_122_121.jpg','http://images1.fanpop.com/images/image_uploads/Smash-N64-Characters-super-smash-brothers-807470_121_131.jpg','http://images1.fanpop.com/images/image_uploads/Smash-N64-Characters-super-smash-brothers-807466_121_180.jpg','http://images1.fanpop.com/images/image_uploads/Smash-N64-Characters-super-smash-brothers-807460_121_180.jpg','http://images1.fanpop.com/images/image_uploads/Smash-N64-Characters-super-smash-brothers-807459_121_180.jpg','http://images1.fanpop.com/images/image_uploads/Smash-N64-Characters-super-smash-brothers-807461_121_180.jpg','http://images1.fanpop.com/images/image_uploads/Smash-N64-Characters-super-smash-brothers-807463_121_180.jpg','http://images1.fanpop.com/images/image_uploads/Smash-N64-Characters-super-smash-brothers-807469_121_172.jpg','http://images1.fanpop.com/images/image_uploads/Smash-N64-Characters-super-smash-brothers-807458_121_180.jpg'];
      randomize();
      score = 10000;
      $('#score').text('- '+score+' -');
      $('#gameOver').fadeOut('fast');
      $('#excellent').fadeOut('fast');
      $('#enterScore').fadeOut('fast');
    }

  function randomize(){
    randLinks = [];
    for(var i = 10; i > 0; i--){
      var ltr = links.splice(rand(),1);
      randLinks.push(ltr[0]);
    }
    randLinks = randLinks.concat(randLinks);
    shuffleLinks(randLinks);
  }

  function reveal(){
    if ($(this).hasClass('show')){return;}
    if (picks.length >= 2){return;}

    $(this).removeClass('box').addClass('show').text(randLinks[$(this).index()]);
    var x = $(this).text();
    $(this).attr('src',x);
    picks.push(this);
    if (picks.length === 1){return;}
    if ($(picks[0]).text() === $(picks[1]).text()){
      score = score + 500;
      $('#score').text('- '+score+' -');
      $('#nice').show().delay(1500).fadeOut('fast');
      $('#niceText').show().delay(1500).fadeOut('fast');
      $('#plus500').show().delay(1500).fadeOut('fast');
      counter += 1;
      if (counter ===  10){victory();}
      picks = [];
      return;
    }
    score = score - 600;
    $('#score').text('- '+score+' -');
    $('#tooBad').show().delay(1500).fadeOut('fast');
    $('#tooBadText').show().delay(1500).fadeOut('fast');
    $('#minus500').show().delay(1500).fadeOut('fast');
    if (score <= 0){victory();}
    setTimeout(function(){
      $(picks[0]).addClass('box').removeClass('show').text('').removeAttr('src');
      $(picks[1]).addClass('box').removeClass('show').text('').removeAttr('src');
      picks = [];
    },1500);
  }

  function victory(){
    counter = 0;
    var x = 'http://images2.wikia.nocookie.net/__cb20121106012960/mario/images/thumb/6/6c/Bowser,_Super_Mario_64_DS.png/500px-Bowser,_Super_Mario_64_DS.png';
    if (score <= 0){$('#excellent').delay(1000).fadeIn('fast').text('GAME OVER!!! - '+score+' - points! Try again!');
      $('#gameOver').fadeIn('fast').attr('src', x);
      setTimeout(reset, 5000);
    }
    $('#gameOver').delay(2000).fadeIn('fast');
    $('#scoreScore').text('-'+score+'-');
    if (score >= 9000){$('#excellent').delay(2000).fadeIn('fast').text('VICTORY! Excellent Score! - '+score+' - points!');}
    if (score > 5000 && score < 8500){$('#excellent').delay(2000).fadeIn('fast').text('VICTORY! Good Score! - '+score+' - points!');}
    if (score > 500 && score < 4500){$('#excellent').delay(2000).fadeIn('fast').text('VICTORY! You can do better! - '+score+' - points!');}
    $('#enterScore').delay(3000).fadeIn('slow');
  }

  function shuffleLinks(dupLinks) {
    for(var i = dupLinks.length -1; i > 0; i--) {
      var x = rand();
      var temp = dupLinks[i];
      dupLinks[i] = dupLinks[x];
      dupLinks[x] = temp;
    }
    return dupLinks;
  }
//---------submitScore----------//

  function submitScore(){
    //var id = $(this).attr('value');
    var name = $('#scoreName').val();
    var points = $('#scoreScore').text();
    var date = $('#scoreDate').val();
    var k = {name:name, points:points, date:date};
    var data = k;
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/score';
    var type = 'POST';
    var success = function(count){
      alert('your score has been registred!');
      $('#enterScore').fadeOut('fast');
      $('#enterScore').css('height', '270px');
      $('#appendino').hide();
      reset();
      console.log(count);
    };
    $.ajax({url:url, type:type, data:data, success:success});
  }

  function showHiScore(){
    $('#gameOver').fadeOut(500);
    $('#excellent').fadeOut(500);
    $('#enterScore').delay(500).animate({height: '770px'},1000);
    getHiScores();
  }

  function getHiScores(){
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/HiScores';
    $.getJSON(url, displayHiScores);
  }

  function displayHiScores(data){
    debugger;
    $('.position').remove();
    console.log(data);
    for(var i = 0; i < data.scores.length; i++){
      appendScores(data.scores[i], i);
    }
  }

  function appendScores(score, i){
    debugger;
    var $name = $('<div>');
    var $points = $('<div>');
    var $date = $('<div>');
    var $position = $('<div>');
    var name = score.name.slice(0, 5);
    var date = score.date.slice(0, 10);

    $name.text(name).addClass('ScoreName').attr('value', score.name);
    $points.text(score.points).addClass('ScorePoints').attr('value', score.points);
    $date.text(date).addClass('ScoreDate').attr('value', score.date);
    $position.text('# '+(i+1)).addClass('position');

    //$($name).hide();
    //$($points).hide();
    //$($date).hide();
    //$($position).hide();
    $('#appendino').hide();

    $('#appendino').append($position);
    $($position).append($name);
    $($position).append($points);
    $($position).append($date);

    $('#appendino').fadeIn('slow');
  }

  function hiScore(){
    $('#scoriAlti').fadeIn('slow');
    getScores();
  }

  function getScores(){
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/HiScores';
    $.getJSON(url, displayScores);
  }

  function displayScores(data){
    $('.posizion').remove();
    for(var i = 0; i < data.scores.length; i++){
      appendScori(data.scores[i], i);
    }
  }

  function appendScori(score, i){
    var $name = $('<div>');
    var $points = $('<div>');
    var $date = $('<div>');
    var $position = $('<div>');
    var name = score.name.slice(0, 5);
    var date = score.date.slice(0, 10);

    $name.text(name).addClass('ScoriName').attr('value', score.name);
    $points.text(score.points).addClass('ScoriPoints').attr('value', score.points);
    $date.text(date).addClass('ScoriDate').attr('value', score.date);
    $position.text('# '+(i+1)).addClass('posizion');

    $('#scori').hide();

    $('#scori').append($position);
    $($position).append($name);
    $($position).append($points);
    $($position).append($date);

    $('#scori').fadeIn('slow');
  }

  function closeHiScore(){
    $('#scoriAlti').fadeOut(500);
  }

})();
