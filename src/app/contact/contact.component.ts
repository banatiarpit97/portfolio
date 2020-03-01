import { Component, OnInit, Inject } from '@angular/core';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AppComponent } from '../app.component';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
declare let google: any;


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {
  mail: FormGroup;
  invalidEmail = false;
  invalidNumber = false;
  internalError = false;
  success = false;

  constructor(@Inject(FormBuilder) fb: FormBuilder,
              public snackbar: MatSnackBar,
              public appComponent: AppComponent,
              private afd: AngularFireDatabase
  ) {
    this.appComponent.title = 'contact';
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
  }

  initMap() {
    const destination = { lat: 28.661847, lng: 77.089045 };
    const mapProperties = {
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
    const map = new google.maps.Map(document.getElementById('mainMap'), mapProperties);

    const destinationMarkerProerties = {
      position: destination,
      animation: google.maps.Animation.BOUNCE,
      map
    };
    const destinationMarker = new google.maps.Marker(destinationMarkerProerties);
    // destinationMarker.setMap(map);

    const destinationInfoWindow = new google.maps.InfoWindow({
      content: 'Banati Developers'
    });

    google.maps.event.addListener(destinationMarker, 'mouseover', () => {
      destinationInfoWindow.open(map, destinationMarker);
    });
    google.maps.event.addListener(destinationMarker, 'mouseout', () => {
      destinationInfoWindow.close();
    });
  }

  sendMail(mail, formDirective) {
    this.afd.list('/contact').push(this.mail.value);
    mail.reset();
    formDirective.resetForm();
    const sb = this.snackbar.open('Your response is recorded, we will get back to you shortly!', 'close');
  }

}
