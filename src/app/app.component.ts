import { Component }          from '@angular/core';
import { SampleCardComponent } from './components/sample-card.component'; 

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
    <button md-raised-button (click)="showDialog()"> OpenDialog </button>
    <div *ngIf="openDialog">
      <sample-card></sample-card>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  openDialog: boolean;
  title = 'Tour of Heroes';
  constructor() {
    this.openDialog = false;
  }
  showDialog() {
    this.openDialog = !this.openDialog;
  }
}
