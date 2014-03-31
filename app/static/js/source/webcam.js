(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    //$(document).foundation();
    //$('#sportGames').change(pullGameTeams);
    $('#webcam').hide();
    $('#closeWC').click(closeWC);
    $('#get').click(get);
    $('#cameraIcon').click(useWebcam);
  }

  function closeWC(){
    $('#webcam').fadeOut(500);
  }

  function get(){
    debugger;
    var id = $('#pictureIcon').attr('value');
    var body = $('#photo').attr('src');
    var k = {body:body};
    var data = k;
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/webcam/' + id;
    var type = 'POST';
    var success = function(count){
      alert('picture successfully added');
      $('#canvas').attr('src', '#');
      closeWC();
    };
    $.ajax({url:url, type:type, data:data, success:success});
  }

  function useWebcam(){
    $('#webcam').fadeIn('slow');

    var streaming = false,
        video        = document.querySelector('#video'),
        canvas       = document.querySelector('#canvas'),
        photo        = document.querySelector('#photo'),
        startbutton  = document.querySelector('#startbutton'),
        width = 320,
        height = 0;

    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

    navigator.getMedia(
      {
        video: true,
        audio: false
      },
      function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
      },
      function(err) {
        console.log('An error occured! ' + err);
      }
    );

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    function takepicture() {
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(video, 0, 0, width, height);
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    }

    startbutton.addEventListener('click', function(ev){
        takepicture();
        ev.preventDefault();
      }, false);

  }

})();
