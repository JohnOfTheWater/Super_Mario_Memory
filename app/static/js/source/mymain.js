/* global google:true */
(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#regFieldset').hide();
    $('#newNote').hide();
    $('#dateS').hide();
    $('#alpha').hide();
    $('#searchResult').hide();
    $('#fullSearchResult').hide();
    $('#searchP *').hide();
    $('#closeSP').hide();
    $('#fullSearchPanel').hide();
    $('#picturePanel').hide();
    $('#closeBP').hide();
    $('#closeAW').hide();
    $('#form2').hide();
    $('#audioForm').hide();
    $('#soundPanel').hide();
    $('#regLog').click(showRegLogPanel);
    $('#closeReg').click(closeRegLogPanel);
    $('#closeNewNote').click(closeNewNote);
    $('#closeFSP').click(closeSearchOpzioni);
    $('#closeSP').click(closeSearchOpzioni);
    $('#closePN').click(closePicturePanel);
    $('#closeAudio').click(closeSoundPanel);
    $('#closeMappa').click(chiudiMappa);
    $('#showN').click(showNewNote);
    $('#testo').click(showNewNote);
    $('#sort').click(showSortOptions);
    $('#dateS').click(sortByDate);
    $('#alpha').click(sortByAlpha);
    $('#srcNB').click(searchByName);
    $('#firstSrc').click(searchByName);
    $('#srcDB').click(searchByDate);
    $('#srcTB').click(searchByTags);
    $('#searchP').click(showSearchOptions);
    $('#saveChanges').click(updateFullNote);
    $('#searchCommand').click(showSearchOpzioni);
    $('#pictureIcon').click(mostraImmagini);
    $('#noteIcon').click(mostraSoundPanel);
    $('#addFoto').click(showNewFoto);
    $('#addAudio').click(showNewAudio);
    $('#pinIcon').click(mostraMappa);
    $('#trashIcon').click(deleteNote);
    $('#welcome').mouseenter(showRegLogPanel);
    $('#notesWrap').on('click', '.picture', queryNote);
    $('#searchResult').on('click', '.picture', queryNote);
    $('#fullSearchResult').on('click', '.picture', goToNote);
    $('#noteWrap').on('click', '.noteButton', updateNote);
    $('#picturePanel').on('click', '.immagine', showBigPic);
    $('#soundPanel').on('click', '.audios', showAudioWindow);
    $('#closeBP').click(removeBigPic);
    $('#closeAW').click(closeAudioWindow);

    findMyLocation();
  }
//------Global Variables-------/

  var lat;
  var lng;


//------Geo-Auto-Positioning-------/

  function findMyLocation(){
    console.log('findMyLocation');
    getLocation();
  }

  function getLocation(){
    console.log('getLocation');
    var geoOptions = {enableHighAccuracy: true, maximumAge: 1000, timeout: 60000};
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
  }

  function geoSuccess(location) {
    console.log('geoSuccess');
    lat = location.coords.latitude;
    lng = location.coords.longitude;
    console.log('lat', lat);
    console.log('lng', lng);

  }

  function geoError() {
    console.log('Sorry, no position available.');
  }

//------animations-------/
//
  function showNewFoto(){
    //$('#picturePanel').fadeOut('fast');
    $('#form2').fadeToggle(500);
  }

  function showNewAudio(){
    //$('#picturePanel').fadeOut('fast');
    $('#audioForm').fadeToggle(500);
  }

  function showSearchOpzioni(){
    //$('#dateS').fadeOut('fast');
    $('#picturePanel').fadeOut('fast');
    $('#fullSearchPanel').fadeIn(500);
    $('#searchPanel').fadeIn(500);
  }

  function closeSearchOpzioni(){
    $('#fullSearchPanel').fadeOut(500);
    //$('#searchPanel').fadeOut(500);
    $('#searchResult').fadeOut(500);
    $('#fullSearchResult').fadeOut(500);
    $('#closeSP').fadeOut(500);
  }

  function closePicturePanel(){
    $('#picturePanel').fadeOut(500);
  }

  function closeSoundPanel(){
    $('#soundPanel').fadeOut(500);
  }

  function showSearchOptions(){
    $('#dateS').fadeOut('fast');
    $('#alpha').fadeOut('fast');
    $('#searchP *').fadeIn(500);
  }

  function showSortOptions(){
    $('#searchP *').fadeOut('fast');
    $('#dateS').fadeIn(500);
    $('#alpha').fadeIn(500);
  }

  function showRegLogPanel(){
    $('#regFieldset').fadeIn(1000);
    $('#regName').focus();
  }

  function closeRegLogPanel(){
    $('#regFieldset').fadeOut(1000);
  }

  function showNewNote(){
    $('#newNote').fadeIn(500);
    $('#noteTitle').focus();
    $('#lat').val(lat);
    $('#lng').val(lng);
  }

  function closeNewNote(){
    $('#newNote').fadeOut(500);
  }

  function mostraMappa(){
    $('#mappa').css('visibility', 'visible');
    $('#closeMappa').css('visibility', 'visible');
  }

  function chiudiMappa(){
    $('#mappa').css('visibility', 'hidden');
    $('#closeMappa').css('visibility', 'hidden');
  }

//-------MostraImmagini&Audio--------------//

  function mostraSoundPanel(){
    var id = $(this).attr('value');
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/noteAudio/'+id;
    $.getJSON(url, displayAudio);
  }

  function displayAudio(data){
    debugger;
    $('.audios').remove();
    $('#soundPanel').fadeIn('fast');
    console.log(data);
    for(var i = 0; i < data.note.audio.length; i++){
      appendAudio(data.note.audio[i], i);
    }
  }

  function appendAudio(audio, i){
    var $title = $('<div>');
    var text = $('#fullTitle').text();
    i += 1;
    $title.text('-'+text+'- Audio File n.'+i).addClass('audios').attr('value', audio);

    $($title).hide();

    $('#soundPanel').append($title);

    $($title).fadeIn('slow');
  }

  function showAudioWindow(){
    $('.audioPlay').remove();
    var src = $(this).attr('value');
    var $audio = $('<audio>');

    $audio.addClass('audioPlay').attr('src', src).attr('controls', 'controls');

    $($audio).hide();

    $('#audioWindow').append($audio);

    $($audio).fadeIn('slow');
    $('#closeAW').fadeIn('slow');
  }

  function closeAudioWindow(){
    $('.audioPlay').fadeOut(500);
    $('#closeAW').fadeOut(500);
  }

  function mostraImmagini(){
    var id = $(this).attr('value');
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/notePictures/'+id;
    $.getJSON(url, displayImmagini);
  }

  function displayImmagini(data){
    $('#picturePanel').fadeIn('fast');
    $('.immagine').remove();
    console.log(data.note.photo);
    for(var i = 0; i < data.note.photo.length; i++){
      appendPictures(data.note.photo[i]);
    }
  }

  function appendPictures(pic){
    var $picture = $('<div>');

    $picture.addClass('immagine').css('background', 'url("'+pic+'")').css('background-size', 'cover');

    $($picture).hide();

    $('#picturePanel').append($picture);

    $($picture).fadeIn('slow');
  }

  function showBigPic(){
    $('.bigPic').remove();
    var style = $(this).attr('style');
    var $picture = $('<div>');

    $picture.addClass('bigPic').attr('style', style);

    $($picture).hide();

    $('#bigPic').append($picture);

    $($picture).fadeIn('slow');
    $('#closeBP').fadeIn('slow');
  }

  function removeBigPic(){
    $('.bigPic').fadeOut(500);
    $('#closeBP').fadeOut(500);
  }

//-------goToNote--------------//

  function goToNote(){
    var id = $(this).attr('value');
    window.location.replace('/fullNote/'+id);
  }

//--------search by name/date/tags-------//

  function searchByName(){
    var title = $('#srcName').val() || $('#search').val();
    //title = title.replace(' ', '-');
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/noteTitle/'+title;
    $.getJSON(url, displaySBD);
  }

  function searchByDate(){
    var date = $('#srcDate').val();
    //title = title.replace(' ', '-');
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/noteDate/'+date;
    $.getJSON(url, displaySBD);
  }

  function searchByTags(){
    var tags = $('#srcTags').val();
    //title = title.replace(' ', '-');
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/noteTags/'+tags;
    $.getJSON(url, displaySBD);
  }

//-------sort by date/alpha-------//

  function sortByDate(){
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/notesByDate';
    $.getJSON(url, displaySBD);
  }

  function sortByAlpha(){
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/notesByAlpha';
    $.getJSON(url, displaySBD);
  }

  function displaySBD(data){
    $('#searchResult').fadeIn();
    $('#fullSearchResult').fadeIn();
    $('#closeSP').fadeIn();
    $('#searchResult .picture').remove();
    $('#fullSearchResult .picture').remove();
    //$('.fotoMI').remove();
    for(var i = 0; i < data.notes.length; i++){
      appendSBD(data.notes[i]);
    }
  }

  function appendSBD(note){
    var $picture = $('<div>');
    var $title = $('<div>');
    var $date = $('<div>');
    var $tags = $('<div>');
    var $sample = $('<div>');
    var date = note.dateCreated.substr(0, 10);

    $picture.addClass('picture').attr('value', note._id);
    $title.addClass('titleResult').text(note.title).attr('value', note._id);
    $date.addClass('dateResult').text(date);
    $tags.addClass('tagsResult').text(note.tags);
    $sample.addClass('sampleResult').text(note.sample+'...');

    $($picture).hide();

    $picture.append($sample);
    $picture.append($tags);
    $picture.append($date);
    $picture.append($title);
    $('#result').append($picture);

    $($picture).fadeIn('slow');
  }

//-------query note-------//
  function queryNote(){
    var id = $(this).attr('value');
    console.log(id);
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/note/'+id;
    $.getJSON(url, displayNote);
  }

  function displayNote(data){
    $('.noteTitle, .noteData, .noteBody, .noteTags, .notePicture, .notePicture2, .fullNoteButton').remove();
    data = data.note;
    var $title = $('<div>');
    var $date = $('<div>');
    //var $body = $('<div>');
    var $tags = $('<div>');
    var $picture = $('<div>');
    var $picture2 = $('<div>');
    //var $picture3 = $('<div>');
    var $edit = $('<textarea>');
    var $update = $('<button>');
    //var $form = $('<form>');
    //var $input = $('<input>');
    //var $button = $('<button>');
    var $fullNote = $('<a>');
    var date = data.dateCreated.slice(0, 10);
    debugger;
    if(data.photo.length !== 0){
      data.photo[0] = '/img/photo.png';
    }else{
      data.photo[0] = '#';
    }
    var sound;
    if(data.audio.length !== 0){
      sound = '/img/sound.png';
    }else{
      sound = '#';
    }

    $title.text(data.title).addClass('noteTitle').attr('data-id', data._id);
    $date.text(date).addClass('noteData').attr('data-id', data._id);
    //$body.attr('data-id', data._id);
    $tags.text(data.tags).addClass('noteTags').attr('data-id', data._id).attr('value', data.tags);
    $picture.addClass('notePicture').attr('data-id', data._id).css('background', 'url("'+data.photo[0]+'")').css('background-size', 'cover').attr('value', data.photo[0]);
    $picture2.addClass('notePicture2').attr('data-id', data._id).css('background', 'url("'+sound+'")').css('background-size', 'cover');
    //$picture3.addClass('notePicture3').attr('data-id', data._id).css('background', 'url("'+data.photo[2]+'")').css('background-size', 'cover');
    $edit.text(data.body).addClass('noteEdit').attr('data-id', data._id);
    $update.text('Save').addClass('noteButton').attr('data-id', data._id).val(data.userId);
    //$form.addClass('noteForm').attr('data-id', data._id).attr('action', '/noteAddPic/'+ data._id).attr('method', 'post').attr('enctype', 'multipart/form-data').val(data.userId);
    //$input.addClass('noteInput').attr('data-id', data._id).attr('type', 'file').attr('name', 'photo');
    //$button.text('Add Photo').addClass('noteFormButton').attr('data-id', data._id).val(data.userId);
    $fullNote.text('FullNote').addClass('fullNoteButton').attr('href', '/fullNote/'+data._id).val(data.userId);

    $('#title').append($title);
    $('#date').append($date);
    //$('#body').append($body);
    $('#tags').append($tags);
    $('#line').append($edit);
    $tags.append($update);
    //$form.append($input);
    //$form.append($button);
    //$('#form').append($form);
    //$picture2.append($picture3);
    $('#picture').append($picture2);
    $('#picture').append($picture);
    $('#fullNote').append($fullNote);

    $('.noteEdit').focus();
  }
//-----updateNote----------//

  function updateNote(){
    var id = $(this).data('id');
    var body = $('.noteEdit[data-id="'+id+'"]').val();
    var k = {body:body};
    var data = k;
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/note/' + id;
    var type = 'PUT';
    var success = function(count){
      $('.noteTitle, .noteData, .noteBody, .noteTags, .notePicture').remove();
      console.log(count);
      alert('your note has been succesfuly updated');
      window.location.replace('/notes');
    };
    $.ajax({url:url, type:type, data:data, success:success});

  }

  function updateFullNote(){
    var id = $(this).attr('value');
    var body = $('#fullBody').val();
    var k = {body:body};
    var data = k;
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/note/' + id;
    var type = 'PUT';
    var success = function(count){
      alert('your note has been succesfuly updated');
      console.log(count);
    };
    $.ajax({url:url, type:type, data:data, success:success});
  }

//-----deleteNote----------//

  function deleteNote(){
    var id = $(this).attr('value');
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/deleteNote/' + id;
    var type = 'DELETE';
    var success = function(count){
      alert('your note has been deleted!');
      window.location.replace('/notes');
    };

    $.ajax({url:url, type:type, success:success});
  }

//------GeoLocation----------//

  var latitudine = $('#pinIcon').attr('value')*1;
  var longitudine = $('#pinIcon').attr('data')*1;
  var title = $('#fullTitle').text();

  var mapOptions = {
    center: new google.maps.LatLng(latitudine, longitudine),
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById('mappa'), mapOptions);

  var markerOptions = {
    position: new google.maps.LatLng(latitudine, longitudine)
  };

  var marker = new google.maps.Marker(markerOptions);
  marker.setMap(map);

  var infoWindowOptions = {
    content: 'Your Note '+title+' was taken Here!'
  };

  var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
  google.maps.event.addListener(marker,'click',function(e){

    infoWindow.open(map, marker);
  });
//----------addPicFromFullNote---------//
/*
  function newFoto(){
    debugger;
    var id = $('#pictureIcon').attr('value');
    var userId = $('#form2').attr('value');
    var $form = $('<form>');
    var $input = $('<input>');
    var $button = $('<button>');

    $form.addClass('xnoteForm').attr('data-id', id).attr('action', '/noteAddPic/'+ id).attr('method', 'post').attr('enctype', 'multipart/form-data').val(userId);
    $input.addClass('noteInput').attr('data-id', id).attr('type', 'file').attr('name', 'photo');
    $button.text('Add Photo').addClass('noteFormButton').attr('data-id', id).val(userId);

    $form.append($input);
    $form.append($button);
    $('#form2').append($form);
  }
*/
})();

