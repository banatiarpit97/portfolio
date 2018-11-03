import { Injectable } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import {
  NavigationStart,
  NavigationEnd,
  Event,
  Router
} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private lBar: SlimLoadingBarService,
      private _router: Router) {
      this._router.events.subscribe((event: Event) => {
        // console.log(event);
        this.loadingBarInterceptor(event);
      });
    }

  private loadingBarInterceptor(event: Event) {
    if (event instanceof NavigationStart) {
      // console.log(1);
      // this.lBar.visible = true;
      this.lBar.height = '4px';
      this.lBar.start();
      // setTimeout(() => {
      // this.lBar.complete();
      // }, 3000);
    }
    if (event instanceof NavigationEnd) {
      // console.log(2);
      this.lBar.complete();
    }
  }
}
