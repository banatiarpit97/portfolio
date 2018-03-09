import { Component, OnInit, Inject } from '@angular/core';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AppComponent } from '../app.component';
declare let google: any;


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {
  mail: FormGroup;
  invalidEmail = false;
  invalidNumber = false;
  internalError = false;
  success = false;

  constructor(@Inject(FormBuilder) fb: FormBuilder, public snackbar: MatSnackBar, public appComponent:AppComponent) {
    this.appComponent.title = "contact";
    this.mail = fb.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
      email: ['', Validators.required],
      regarding: ['', Validators.required],
      message: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.initMap();
    $('#mainMap').mouseover(function(){
      $('.get_directions').css('display', 'block');
      $('.address').css('transform', 'translateY(-45px)');
    })
    $('#mainMap').mouseleave(function () {
      $('.get_directions').css('display', 'none');
    $('.address').css('transform', 'translateY(7px)');
    })
    $('.get_directions').mouseover(function(){
      $('.get_directions').css('display', 'block');
      $('.address').css('transform', 'translateY(-45px)');
    })
    $('.get_directions').mouseleave(function () {
      $('.get_directions').css('display', 'none');
      $('.address').css('transform', 'translateY(7px)');
    })
  }

  initMap(){
    var destination = { lat: 28.661847, lng: 77.089045 };
    var mapProperties = {
      center: destination,
      zoom: 13,
      panControl: true,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: true,
      overviewMapControl: true,
      rotateControl: true
    };
    var map = new google.maps.Map(document.getElementById("mainMap"), mapProperties);

    var destinationMarkerProerties = {
      position: destination,
      animation: google.maps.Animation.BOUNCE,
      map: map
    }
    var destinationMarker = new google.maps.Marker(destinationMarkerProerties);
    // destinationMarker.setMap(map);

    var destinationInfoWindow = new google.maps.InfoWindow({
      content: "Banati Developers"
    })

    google.maps.event.addListener(destinationMarker, 'mouseover', function () {
      destinationInfoWindow.open(map, destinationMarker);
    })
    google.maps.event.addListener(destinationMarker, 'mouseout', function () {
      destinationInfoWindow.close();
    })
  }

  sendMail(){
    var global = this;
    console.log(this.mail.value);
    $.ajax({
      url:'http://banati.thecompletewebhosting.com/Portfolio/send_mail.php',
      type:'POST',
      data: { name: this.mail.value.name, email: this.mail.value.email, number: this.mail.value.number, subject: this.mail.value.regarding, message: this.mail.value.message},
      success:function(data){
        console.log(data);
        if (data == "invalid email"){
          global.invalidEmail = true;
        }
        if (data == 'invalid number'){
          global.invalidNumber = true;
          global.invalidEmail = false;

        }
        if (data == 'error storing in database' || data == 'Error sending Email') {
          global.internalError = true;
          global.invalidNumber = false;
          global.invalidEmail = false;
        }
        if (data == 'success') {
          let sb = global.snackbar.open('Your response is recorded, we will get back to you shortly!', 'close');
          global.success = true;
          global.invalidEmail = false;
          global.invalidNumber = false;
          global.internalError = false;
        }
        global.mail.reset;
      },
      error:function(){
        console.log('error');
      }
    })
  }

}
