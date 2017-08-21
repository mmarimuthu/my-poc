import { Directive, Input, TemplateRef } from '@angular/core';
import { MdDialog } from '@angular/material';
import { ModalConfig } from '../model/modal-config.model';

@Directive({ selector: '[modal]' })
export class SampleModalDirective {
    // @Input ('modal') modalConfigg: ModalConfig;
       constructor(public dialog: MdDialog,
                private templateRef: TemplateRef<any>    
                ) {
                    console.log('Inside Directive,', this.templateRef);
                
    }

    @Input() set modal (modalConfig: ModalConfig) {
        if( modalConfig ) {
            let dialogRef = this.dialog.open(this.templateRef,modalConfig );            
        }
    }
}