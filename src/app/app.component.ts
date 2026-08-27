import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  sidebarCollapsed = false;

  ngOnInit(): void {

    const savedState = localStorage.getItem('sidebarCollapsed');

    if (savedState !== null) {
      this.sidebarCollapsed = savedState === 'true';
    }

  }

  toggleSidebar(): void {

    this.sidebarCollapsed = !this.sidebarCollapsed;

    localStorage.setItem(
      'sidebarCollapsed',
      this.sidebarCollapsed.toString()
    );

  }

}
