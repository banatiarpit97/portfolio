import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AppComponent } from '../app.component';
declare let google: any;

@Component({
  selector: 'app-directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.scss']
})
export class DirectionsComponent implements OnInit {
  map;
  userMarker; userMarkerProperties;
  directionsService; directionsDisplay;
  resultPara; resultParaSuccess;
  destination;
  geocoder;
  location;

  constructor(public appComponent: AppComponent) {
    this.appComponent.title = 'directions';
  }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    const global = this;
    this.destination = { lat: 28.661847, lng: 77.089045 };
    const mapProperties = {
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
    this.map = new google.maps.Map(document.getElementById('map'), mapProperties);

    const destinationMarkerProerties = {
      position: this.destination,
      animation: google.maps.Animation.BOUNCE,
      map: this.map
    };
    const destinationMarker = new google.maps.Marker(destinationMarkerProerties);

    const destinationInfoWindow = new google.maps.InfoWindow({
      content: 'Banati Developers'
    });

    google.maps.event.addListener(destinationMarker, 'mouseover', () => {
      destinationInfoWindow.open(global.map, destinationMarker);
    });
    google.maps.event.addListener(destinationMarker, 'mouseout', () => {
      destinationInfoWindow.close();
    });

    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsDisplay.setMap(global.map);
    this.geocoder = new google.maps.Geocoder();
    const input = document.getElementById('input_box');
    const inputOptions = {
      types: ['(regions)']
    };
    const autocomplete = new google.maps.places.Autocomplete(input, inputOptions);

    this.getCurrentLocation();

    this.map.addListener('click', (event) => {
      const userLocation = event.latLng;
      if (global.userMarker) {
        global.userMarker.setMap(null);
        global.userMarkerProperties = {
          position: event.latLng,
          map: global.map,
          animation: google.maps.Animation.DROP,
          draggable: true
        };
        global.userMarker = new google.maps.Marker(global.userMarkerProperties);
        const userInfoWindow = new google.maps.InfoWindow({
          content: 'Your Location'
        });
        google.maps.event.addListener(global.userMarker, 'mouseover', () => {
          userInfoWindow.open(global.map, global.userMarker);
        });
        google.maps.event.addListener(global.userMarker, 'mouseout', () => {
          userInfoWindow.close();
        });
      } else {
        global.userMarkerProperties = {
          position: event.latLng,
          animation: google.maps.Animation.DROP,
          draggable: true
        };

        global.userMarker = new google.maps.Marker(global.userMarkerProperties);
        global.userMarker.setMap(global.map);
        const userInfoWindow = new google.maps.InfoWindow({
          content: 'Your Location'
        });
        google.maps.event.addListener(global.userMarker, 'mouseover', () => {
          userInfoWindow.open(global.map, global.userMarker);
        });
        google.maps.event.addListener(global.userMarker, 'mouseout', () => {
          userInfoWindow.close();
        });
      }
      global.getRoute(event.latLng, global.destination);
      global.geocodeLatLng(global.userMarker.getPosition().lat(), global.userMarker.getPosition().lng());
    });
  }

    getRoute(userLocation, destination) {
      const global = this;
      const request = {
        origin: userLocation,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
      };
      this.directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          global.resultPara = `Great, you are just ${result.routes[0].legs[0].distance.text} far from us.
           You can reach here in about ${result.routes[0].legs[0].duration.text}`;
          global.directionsDisplay.setDirections(result);
        } else {
          global.resultPara = 'Sorry, unable to find your address, please try by clicking on the map';
        }
        $('#result').html(global.resultPara);
      });
    }

  getWalkingRoute(userLocation, destination) {
    const global = this;
    const request = {
      origin: userLocation,
      destination,
      travelMode: google.maps.TravelMode.WALKING,
      unitSystem: google.maps.UnitSystem.METRIC
    };
    this.directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        global.directionsDisplay.setDirections(result);
      }
    });
  }

  geocodeLatLng(lat, lng) {
    const latlng = { lat, lng };
    this.geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          const formattedAddress = results[0].formatted_address;
          const formattedAddressPrint = formattedAddress.split(', India');
          $('.your_address').removeClass('hidden');
          $('.your_address2').html(formattedAddressPrint);
        }
      }
    });
  }

  getDirections() {
    const global = this;
    if (this.userMarker) {
      this.userMarker.setMap(null);
    }
    // var enteredLocation = document.getElementById('input_box').value;
    const enteredLocation = $('#input_box').val();
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${enteredLocation}
    &key=AIzaSyA4igRZqRNKH0ksgjP7YNmhUA_vcbkgquU`;
    $.getJSON(url, function(data) {
      if (data.status === 'OK') {
        const userLocation = data.results[0].geometry.location;
        const formattedAddress = data.results[0].formatted_address;
        $.each(data.results[0].address_components, (index, element) => {
          if (element.types[0] === 'postal_code') {
            const postcode = element.long_name;
            return false;
          }
        });
        const formattedAddressPrint = formattedAddress.split(', India');
        $('.your_address').removeClass('hidden');
        $('.your_address2').html(formattedAddressPrint);
        global.getRoute(userLocation, global.destination);
      } else {
        this.resultPara = 'Sorry, unable to find your address, please try by clicking on the map';
        // global.getRoute(userLocation, global.destination);
      }
    });

  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const global = this;
        this.geocodeLatLng(position.coords.latitude, position.coords.longitude);
        if (this.userMarker) {
          this.userMarker.setMap(null);
          this.userMarkerProperties = {
            position: { lat: position.coords.latitude, lng: position.coords.longitude },
            map: global.map,
            animation: google.maps.Animation.DROP,
            draggable: true
          };
          this.userMarker = new google.maps.Marker(this.userMarkerProperties);
          const userInfoWindow = new google.maps.InfoWindow({
            content: 'Your Current Location'
          });
          google.maps.event.addListener(this.userMarker, 'mouseover', () => {
            userInfoWindow.open(global.map, global.userMarker);
          });
          google.maps.event.addListener(global.userMarker, 'mouseout', () => {
            userInfoWindow.close();
          });
          this.getRoute({ lat: position.coords.latitude, lng: position.coords.longitude }, this.destination);
        } else {
          this.userMarkerProperties = {
            position: { lat: position.coords.latitude, lng: position.coords.longitude },
            animation: google.maps.Animation.DROP,
            draggable: true
          };

          this.userMarker = new google.maps.Marker(this.userMarkerProperties);
          this.userMarker.setMap(this.map);
          const userInfoWindow = new google.maps.InfoWindow({
            content: 'Your Current Location'
          });
          google.maps.event.addListener(this.userMarker, 'mouseover', () => {
            userInfoWindow.open(global.map, global.userMarker);
          });
          google.maps.event.addListener(this.userMarker, 'mouseout', () => {
            userInfoWindow.close();
          });
          this.getRoute({ lat: position.coords.latitude, lng: position.coords.longitude }, this.destination);

        }
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            window.alert('User denied the request for Geolocation.');
            break;
          case error.POSITION_UNAVAILABLE:
            window.alert('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            window.alert('The request to get user location timed out.');
            break;
          // case error.UNKNOWN_ERROR:
            // window.alert("An unknown error occurred.")
            // break;
        }
      });
    } else {
      window.alert('Geolocation is not supported by this browser.');
    }
  }

  showPosition(position) {
    const global = this;
    this.geocodeLatLng(position.coords.latitude, position.coords.longitude);
    if (this.userMarker) {
      this.userMarker.setMap(null);
      this.userMarkerProperties = {
        position: { lat: position.coords.latitude, lng: position.coords.longitude },
        map: global.map,
        animation: google.maps.Animation.DROP,
        draggable: true
      };
      this.userMarker = new google.maps.Marker(this.userMarkerProperties);
      const userInfoWindow = new google.maps.InfoWindow({
        content: 'Your Current Location'
      });
      google.maps.event.addListener(this.userMarker, 'mouseover', () => {
        userInfoWindow.open(global.map, global.userMarker);
      });
      google.maps.event.addListener(global.userMarker, 'mouseout', () => {
        userInfoWindow.close();
      });
      this.getRoute({ lat: position.coords.latitude, lng: position.coords.longitude }, this.destination);
    } else {
      this.userMarkerProperties = {
        position: { lat: position.coords.latitude, lng: position.coords.longitude },
        animation: google.maps.Animation.DROP,
        draggable: true
      };

      this.userMarker = new google.maps.Marker(this.userMarkerProperties);
      this.userMarker.setMap(this.map);
      const userInfoWindow = new google.maps.InfoWindow({
        content: 'Your Current Location'
      });
      google.maps.event.addListener(this.userMarker, 'mouseover', () => {
        userInfoWindow.open(global.map, global.userMarker);
      });
      google.maps.event.addListener(this.userMarker, 'mouseout', () => {
        userInfoWindow.close();
      });
      this.getRoute({ lat: position.coords.latitude, lng: position.coords.longitude }, this.destination);
    }
}

// geolocation errors
  showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        window.alert('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        window.alert('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        window.alert('The request to get user location timed out.');
        break;
      case error.UNKNOWN_ERROR:
        window.alert('An unknown error occurred.');
        break;
    }
  }


}
