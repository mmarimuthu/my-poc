import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/subject';
import { ComponentType } from '@angular/material';

@Injectable()
export class CommunicationService {
    componentName$: Observable<ComponentType<any>>;
    private _componentName: any;
    constructor() {
        this._componentName = new Subject<ComponentType<any>>();
        this.componentName$ = this._componentName.asObservable();
    }

    openDialog(component: ComponentType<any>) {
        console.log('CommunicationService: openDialog()', component);
        this._componentName.next(component);
    }

}

//

import { Directive, Input, TemplateRef, Component, OnInit, Type } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { ModalConfig } from '../model/modal-config.model';
import { CommunicationService } from '../services/component-communication.service';

@Directive({ selector: '[modal]' })
export class SampleModalDirective {
    private dialogRef: MdDialogRef<any>;
    private modalConfig: MdDialogConfig;

   constructor(private dialog: MdDialog, private templateRef: TemplateRef<any> ) {
        if(!this.dialogRef) {
            this.openModal(this.templateRef);
            console.log('constructor if');
        }
    }

    @Input() set modal (modalConfig: ModalConfig) {
        if( modalConfig ) {
            this.modalConfig.disableClose = true;
            this.modalConfig.panelClass = 'modal';
            this.openModal(this.templateRef);   
            console.log('Input set');
        }
    }

    openModal(template: TemplateRef<any>){
        this.dialogRef = this.dialog.open(template, this.modalConfig);
    }
}

////////////////////////

import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { CommunicationService } from '../services/component-communication.service';

@Component({
    selector: 'sample-modal',
    template: `<ng-container></ng-container>`
})

export class ModalComponent implements OnInit {    
    constructor(private communicationService: CommunicationService,
                private dialog: MdDialog) {
         
        this.communicationService.componentName$.subscribe( component => {
            console.log('ModalComponent: constructor', component);
            let dialogRef = this.dialog.open(component);
        });
     }

    ngOnInit() { }
}

/////////////////// Add the new componnet, service and directive in ngmodule

import { Component, ViewChildren }  from '@angular/core';
import { ComponentType } from '@angular/material';
import { SampleCardComponent } from './components/sample-card.component';
import { SampleModalDirective } from './directives/sample-modal.directive';
import  { CommunicationService } from './services/component-communication.service';

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
    <sample-card *modal></sample-card>
    <sample-modal></sample-modal>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChildren(SampleModalDirective) modalDirective: SampleModalDirective;
  openDialog: boolean;
  title = 'Tour of Heroes';
  component: ComponentType<SampleCardComponent>;
  constructor(private communicationService: CommunicationService) {
    this.openDialog = false;
  }
  showDialog() {
    this.communicationService.openDialog(SampleCardComponent);
  }
}


