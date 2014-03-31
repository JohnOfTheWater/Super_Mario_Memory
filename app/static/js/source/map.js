/* global google:true */
/* jshint camelcase:false */

(function(){

  'use strict';

  $(document).ready(initialize);

  var map, lat, lng, service, infowindow, where, resultNumber;
  var markers = [];
  console.log(markers);

  function initialize(){
    initMap(0, 0, 2);
    findMyLocation();
  }

/*
  function clickSearch(){
    var url = '/listings/query?lat=' + lat + '&lng=' + lng;
    $.getJSON(url, function(data){
      console.log(data);
    });
  }
*/

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
    where = new google.maps.LatLng(lat, lng);
    initMap(lat, lng, 11);

    //$('#search').show();
  }

  function geoError() {
    console.log('Sorry, no position available.');
  }

  function initMap(lat, lng, zoom){
    var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var request = {
      location: where,
      radius: '30000',
      types: ['bar']
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }

  function callback(results, status){
    if(status === google.maps.places.PlacesServiceStatus.OK){
      for(var i = 0; i < results.length; i++){
        var place = results[i];
        createMarker(place);
        resultNumber = i+1;
        appendPlace(place, resultNumber);
        console.log('place', place);
      }
    }
  }

  function appendPlace(place, number){
    var $place = $('<div>');
    $place.attr('id', 'result'+number).addClass('result');
    var $number = $('<button>');
    $number.text('#'+number);
    $number.addClass('resultNumber');
    var $name = $('<p>');
    $name.text(place.name).addClass('resultName');
    var $rating = $('<button>');
    $rating.text('rating: '+place.rating+' out of 5');
    $rating.addClass('resultRating');
    var $address = $('<p>');
    $address.text(place.vicinity).addClass('resultAddress');

    $place.append($number);
    $place.append($name);
    $place.append($rating);
    $place.append($address);
    $('#sportBars').append($place);
  }

  function createMarker(place){
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: placeLoc
    });

    google.maps.event.addListener(marker, 'click', function(){
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }


/*
  function addMarker(location){
    var position = new google.maps.LatLng(location.lat, location.lng);
    var marker = new google.maps.Marker({map:map, position:position, title:location.address});
    markers.push(marker);
  }
*/

/*
  function test(lat, lng){
    //parameters - location is first
    var location = 'location='+lat+','+lng;
    var radius = '&radius=20';
    var type = '&type=bar';
    //var rankby = '&rankby=prominence';
    var sensor = '&sensor=false';
    var keyword = '&keyword=sports';

    //static
    var key = '&key=AIzaSyBMtvvvpS6EdDRhhcPa-gbRaoOe7BQR6dk';
   // var key = '&key=AIzaSyDj454cC3IAM8tL9fXs38_0_mAKjVNtn28';
    var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    url = url+location+radius+type+sensor+keyword+key;
    console.log(url);
    //var it = 'https://maps.googleapis.com/maps/api/place/search/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&sensor=false'+key;
    $.getJSON(url, testResults);
  }

  function testResults(data){
    console.log(data);
  }
*/

})();
