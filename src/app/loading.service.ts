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
              private router: Router) {
      this.router.events.subscribe((event: Event) => {
        this.loadingBarInterceptor(event);
      });
    }

  private loadingBarInterceptor(event: Event) {
    if (event instanceof NavigationStart) {
      this.lBar.height = '4px';
      this.lBar.start();
    }
    if (event instanceof NavigationEnd) {
      this.lBar.complete();
    }
  }
}
