import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    $(function () {
      $('.navbar-collapse ul li a:not(.dropdown-toggle)').bind('click', function () {
        $('.navbar-toggle:visible').click();
      });
    });
  }
  title = 'home';  

}

