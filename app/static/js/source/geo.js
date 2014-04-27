/* global google:true */
(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    findMyLocation();
  }



//------Geo-Auto-Positioning-------/

  var lat;
  var lng;

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

})();

