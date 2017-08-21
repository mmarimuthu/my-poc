import { Component, OnInit } from '@angular/core';
import { ModalConfig  } from '../model/modal-config.model';


@Component({
    selector: 'sample-card',
    templateUrl: './sample-card.component.html'
})

export class SampleCardComponent implements OnInit {
    sampleModalConfig: ModalConfig;
    constructor() {
        this.sampleModalConfig = {
            height: '800px',
            width: '400px'    
        };
        console.log('Inside Card Component', this.sampleModalConfig)
    }

    ngOnInit() { }
}