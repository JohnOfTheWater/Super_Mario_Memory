(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    background();
  }

  function background(){
    debugger;
    if($('#regLog').text() === 'Register/Login'){
      $('body').css('background', '-webkit-linear-gradient(-45deg, #e4f5fc 0%,#bfe8f9 50%,#9fd8ef 96%,#9fd8ef 96%,#2ab0ed 100%)');
    }
  }


})();

