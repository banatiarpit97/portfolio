import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
declare let google: any;

@Component({
  selector: 'app-directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.css']
})
export class DirectionsComponent implements OnInit {
  map;
  userMarker; userMarkerProperties;
  directionsService; directionsDisplay;
  resultPara = "lalalalallal"; resultParaSuccess;
  destination;
  geocoder;
  location;
  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    var global = this;
    this.destination = { lat: 28.661847, lng: 77.089045 };
    var mapProperties = {
      center: this.destination,
      zoom: 13,
      panControl: true,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: true,
      overviewMapControl: true,
      rotateControl: true
    };
    this.map = new google.maps.Map(document.getElementById("map"), mapProperties);

    var destinationMarkerProerties = {
      position: this.destination,
      animation: google.maps.Animation.BOUNCE,
      map: this.map
    }
    var destinationMarker = new google.maps.Marker(destinationMarkerProerties);

    var destinationInfoWindow = new google.maps.InfoWindow({
      content: "Banati Developers"
    })

    google.maps.event.addListener(destinationMarker, 'mouseover', function () {
      destinationInfoWindow.open(global.map, destinationMarker);
    })
    google.maps.event.addListener(destinationMarker, 'mouseout', function () {
      destinationInfoWindow.close();
    })

    // ----------------------------------------------------------------------------------

    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsDisplay.setMap(global.map);
    this.geocoder = new google.maps.Geocoder();
    var input = document.getElementById('input_box');
    var inputOptions = {
      types: ['(regions)']
    }
    var autocomplete = new google.maps.places.Autocomplete(input, inputOptions);

    // ----------------------------------------------------------------------------------

    this.map.addListener('click', function (event) {
      var userLocation = event.latLng;
      if (global.userMarker) {
        global.userMarker.setMap(null)
        global.userMarkerProperties = {
          position: event.latLng,
          map: global.map,
          animation: google.maps.Animation.DROP,
          draggable: true
        }
        global.userMarker = new google.maps.Marker(global.userMarkerProperties);
        var userInfoWindow = new google.maps.InfoWindow({
          content: "Your Location"
        });
        google.maps.event.addListener(global.userMarker, 'mouseover', function () {
          userInfoWindow.open(global.map, global.userMarker);
        })
        google.maps.event.addListener(global.userMarker, 'mouseout', function () {
          userInfoWindow.close();
        })
        // getRoute();
      }
      else {
        global.userMarkerProperties = {
          position: event.latLng,
          animation: google.maps.Animation.DROP,
          draggable: true
        }

        global.userMarker = new google.maps.Marker(global.userMarkerProperties);
        global.userMarker.setMap(global.map);
        var userInfoWindow = new google.maps.InfoWindow({
          content: "Your Location"
        });
        google.maps.event.addListener(global.userMarker, 'mouseover', function () {
          userInfoWindow.open(global.map, global.userMarker);
        })
        google.maps.event.addListener(global.userMarker, 'mouseout', function () {
          userInfoWindow.close();
        })

      }
      global.getRoute(event.latLng, global.destination);

      // userLat = userMarker.getPosition().lat();
      // userLng = userMarker.getPosition().lng();
      global.geocodeLatLng(global.userMarker.getPosition().lat(), global.userMarker.getPosition().lng());
    })
    
  }

    getRoute(userLocation, destination) {
      var global = this;
      var request = {
        origin: userLocation,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
      }
      this.directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          global.resultPara = 'Great, you are just ' + result.routes[0].legs[0].distance.text + ' far from us. You can reach here in about ' + result.routes[0].legs[0].duration.text
          global.directionsDisplay.setDirections(result);
        }
        else {
          global.resultPara = 'Sorry, unable to find your address, please try by clicking on the map';
        }
        $('#result').html(global.resultPara);
      })
    }

 geocodeLatLng(lat, lng) {
  var latlng = { lat: lat, lng: lng };
  this.geocoder.geocode({ 'location': latlng }, function (results, status) {
    if (status === 'OK') {
      if (results[0]) {
        var formattedAddress = results[0].formatted_address;
        var formattedAddressPrint = formattedAddress.split(', India')
        $(".your_address").removeClass('hidden');
        $(".your_address2").html(formattedAddressPrint);
      }
    }
    });
  }

  getDirections() {
    var global = this;
    if (this.userMarker) {
      this.userMarker.setMap(null)
    }
    // var enteredLocation = document.getElementById('input_box').value;
    var enteredLocation = $('#input_box').val();
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + enteredLocation + '&key=AIzaSyA4igRZqRNKH0ksgjP7YNmhUA_vcbkgquU'
    $.getJSON(url, function (data) {
      if (data.status == 'OK') {
        var userLocation = data.results[0].geometry.location;
        var formattedAddress = data.results[0].formatted_address;
        $.each(data.results[0].address_components, function (index, element) {
          if (element.types[0] == "postal_code") {
            var postcode = element.long_name;
            return false;
          }
        })
        var formattedAddressPrint = formattedAddress.split(', India')
        $(".your_address").removeClass('hidden');
        $(".your_address2").html(formattedAddressPrint)
        global.getRoute(userLocation, global.destination);
      }
      else {
        this.resultPara = 'Sorry, unable to find your address, please try by clicking on the map';
        // global.getRoute(userLocation, global.destination);
      }
    })

  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var global = this;
        this.geocodeLatLng(position.coords.latitude, position.coords.longitude);
        if (this.userMarker) {
          this.userMarker.setMap(null)
          this.userMarkerProperties = {
            position: { lat: position.coords.latitude, lng: position.coords.longitude },
            map: global.map,
            animation: google.maps.Animation.DROP,
            draggable: true
          }
          this.userMarker = new google.maps.Marker(this.userMarkerProperties);
          var userInfoWindow = new google.maps.InfoWindow({
            content: "Your Current Location"
          });
          google.maps.event.addListener(this.userMarker, 'mouseover', function () {
            userInfoWindow.open(global.map, global.userMarker);
          })
          google.maps.event.addListener(global.userMarker, 'mouseout', function () {
            userInfoWindow.close();
          })
          this.getRoute({ lat: position.coords.latitude, lng: position.coords.longitude }, this.destination);
        }
        else {
          this.userMarkerProperties = {
            position: { lat: position.coords.latitude, lng: position.coords.longitude },
            animation: google.maps.Animation.DROP,
            draggable: true
          }

          this.userMarker = new google.maps.Marker(this.userMarkerProperties);
          this.userMarker.setMap(this.map);
          var userInfoWindow = new google.maps.InfoWindow({
            content: "Your Current Location"
          });
          google.maps.event.addListener(this.userMarker, 'mouseover', function () {
            userInfoWindow.open(global.map, global.userMarker);
          })
          google.maps.event.addListener(this.userMarker, 'mouseout', function () {
            userInfoWindow.close();
          })
          this.getRoute({ lat: position.coords.latitude, lng: position.coords.longitude }, this.destination);

        }
      }, 
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            window.alert("User denied the request for Geolocation.")
            break;
          case error.POSITION_UNAVAILABLE:
            window.alert("Location information is unavailable.")
            break;
          case error.TIMEOUT:
            window.alert("The request to get user location timed out.")
            break;
          // case error.UNKNOWN_ERROR:
            // window.alert("An unknown error occurred.")
            // break;
        }
      });
    }
    else {
      window.alert("Geolocation is not supported by this browser.")
    }
  }

 showPosition(position) {
   var global = this;
   this.geocodeLatLng(position.coords.latitude, position.coords.longitude);
  if (this.userMarker) {
    this.userMarker.setMap(null)
    this.userMarkerProperties = {
      position: { lat: position.coords.latitude, lng: position.coords.longitude },
      map: global.map,
      animation: google.maps.Animation.DROP,
      draggable: true
    }
    this.userMarker = new google.maps.Marker(this.userMarkerProperties);
    var userInfoWindow = new google.maps.InfoWindow({
      content: "Your Current Location"
    });
    google.maps.event.addListener(this.userMarker, 'mouseover', function () {
      userInfoWindow.open(global.map, global.userMarker);
    })
    google.maps.event.addListener(global.userMarker, 'mouseout', function () {
      userInfoWindow.close();
    })
    this.getRoute({ lat: position.coords.latitude, lng: position.coords.longitude }, this.destination);
  }
  else {
    this.userMarkerProperties = {
      position: { lat: position.coords.latitude, lng: position.coords.longitude },
      animation: google.maps.Animation.DROP,
      draggable: true
    }

    this.userMarker = new google.maps.Marker(this.userMarkerProperties);
    this.userMarker.setMap(this.map);
    var userInfoWindow = new google.maps.InfoWindow({
      content: "Your Current Location"
    });
    google.maps.event.addListener(this.userMarker, 'mouseover', function () {
      userInfoWindow.open(global.map, global.userMarker);
    })
    google.maps.event.addListener(this.userMarker, 'mouseout', function () {
      userInfoWindow.close();
    })
    this.getRoute({ lat: position.coords.latitude, lng: position.coords.longitude }, this.destination);

  }
}

//geolocation errors
showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      window.alert("User denied the request for Geolocation.")
      break;
    case error.POSITION_UNAVAILABLE:
      window.alert("Location information is unavailable.")
      break;
    case error.TIMEOUT:
      window.alert("The request to get user location timed out.")
      break;
    case error.UNKNOWN_ERROR:
      window.alert("An unknown error occurred.")
      break;
  }
}


}
