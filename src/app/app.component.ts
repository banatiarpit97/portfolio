import { Component } from '@angular/core';
import * as $ from 'jquery';
import { LoadingService } from './loading.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'home';
  constructor(public loadingService: LoadingService) {
    $(function () {
      $('.navbar-collapse ul li a:not(.dropdown-toggle)').bind('click', function () {
        $('.navbar-toggle:visible').click();
      });
    });
  }

}

