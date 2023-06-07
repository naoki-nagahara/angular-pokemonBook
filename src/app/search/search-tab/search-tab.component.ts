import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-search-tab',
  templateUrl: './search-tab.component.html',
  styleUrls: ['./search-tab.component.css'],
})
export class SearchTabComponent {
  currentTab: string = '';
  constructor(private router: Router) {}
  ngOnInit() {
    this.getURL();
  }
  getURL() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.currentTab = this.router.url;
      }
    });
  }
}
