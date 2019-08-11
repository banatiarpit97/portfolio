import { Component } from '@angular/core';
import * as $ from 'jquery';
import { AppComponent } from '../app.component';
import { LoadingService } from './../loading.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  navOpen = false;
  constructor(public appComponent: AppComponent, public loadingService: LoadingService) {
    $(() => {
      $('.navbar-collapse ul li a:not(.dropdown-toggle)').bind('click', () => {
        $('.collapse').animate({ height: '0' });
      });
      $('.navbar-toggle').click(() => {
        this.navOpen = !this.navOpen;
        if (this.navOpen) {
          $('.collapse').animate({height: '300px'});
        } else {
          $('.collapse').animate({ height: '0' });
        }
      });
    });
  }

}
