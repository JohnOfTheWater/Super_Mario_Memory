(function(){
  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $('#nprWrap').hide();
    $('#nprIcon').click(getNews);
    $('#closeNpr').click(closeNews);
  }

  function closeNews(){
    $('#nprWrap').fadeOut(500);
  }

  //http://api.npr.org/query?id=1019&apiKey=MDEzNDU3MjI2MDEzOTU4ODQyODA5ZTk0YQ001
  function getNews(){
    $('.nprImage').remove();
    $('#nprWrap').fadeIn('slow');
    var id = getId(id);
    console.log(id);
    var url = 'http://api.npr.org/query?id='+id+'&apiKey=MDEzNDU3MjI2MDEzOTU4ODQyODA5ZTk0YQ001&numResults=3&format=json';
    $.getJSON(url, receive);
  }

  function getId(){
    debugger;
    var operator = $('#fullTags').text();
    var y = operator.search(',');
    if(y === -1){
      operator = operator;
    }else{
      operator = operator.slice(0, y);
    }
    var result;


    switch(operator){
      default:
        result = 1019;
        break;
      case 'space':
        result = 1026;
        break;
      case 'fun':
        result = 1130;
        break;
      case 'animals':
        result = 1132;
        break;
      case 'travel':
        result = 1004;
        break;
      case 'art':
        result = 1008;
        break;
      case 'books':
        result = 1161;
        break;
      case 'business':
        result = 1006;
        break;
      case 'economy':
        result = 1017;
        break;
      case 'fitness':
        result = 1134;
        break;
      case 'recipies':
        result = 1139;
        break;
      case 'games':
        result = 1052;
        break;
      case 'health':
        result = 1128;
        break;
      case 'history':
        result = 1136;
        break;
      case 'mental health':
        result = 1029;
        break;
      case 'movies':
        result = 1045;
        break;
      case 'news':
        result = 1001;
        break;
      case 'science':
        result = 1007;
        break;
      case 'sport':
        result = 1055;
        break;
      case 'technology':
        result = 1019;
        break;
      case 'television':
        result = 1138;
        break;
    }
    return result;

  }

  function receive(data){
    debugger;
    console.log(data);
    console.log(data.list.story[0].title.$text);
    //console.log(data.list.story[0].text.paragraph[0].$text);
    //console.log(data.list.story[0].image[0].enlargement.src);
    console.log(data.list.story[0].link[0].$text);
    for(var i = 0; i < 3; i++){
      debugger;
      var title = data.list.story[i].title.$text;
      //var text = data.list.story[i].text.paragraph[0].$text;
      var text = getText(data.list.story[i]);
      var image = getImage(data.list.story[i]);//data.list.story[i].image[0].enlargement.src || '/img/noPic.gif';
      var link = data.list.story[i].link[0].$text;

      text = text.slice(0, 120);

      var $title = $('<div>');
      var $text = $('<div>');
      var $image = $('<div>');
      var $link = $('<a>');

      $title.text(title).addClass('nprTitle');
      $text.text(text+'...').addClass('nprText');
      $image.css('background','url('+image+')').css('background-size', 'cover').addClass('nprImage');
      $link.text('See full Article').attr('href', link).attr('target', '_blank').addClass('nprLink');


      $image.append($title);
      $image.append($text);
      $image.append($link);
      $('#nprWrap').append($image);
    }
  }

  function getImage(image){
    debugger;
    if(image.image === undefined){
      var x = '/img/noPic.gif';
      return x;
    }
    if(image.image[0].enlargement === undefined){
      return image.image[0].src;
    }else{
      return image.image[0].enlargement.src;
    }
  }

  function getText(text){
    debugger;
    if(text.paragraph === undefined){
      var x = text.teaser.$text || 'Sorry, no short paragraph available for this article...please visit our website for the full article. Thank you';
      return x;
    }
  }


})();
