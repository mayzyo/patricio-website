import { AfterViewInit, Component, ComponentRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    standalone: true,
    selector: 'app-dialog-form',
    templateUrl: './dialog-form.component.html',
    styleUrls: ['./dialog-form.component.scss'],
    imports: [
        NgbModalModule
    ]
})
export class DialogFormComponent implements AfterViewInit {
    @ViewChild('content') content?: ComponentRef<any>; 

    constructor(protected modal: NgbModal) {}

    ngAfterViewInit() {
        if(!this.content) {
            throw new Error('Child not initialised!');
        }

        this.modal.open(this.content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then(
            (result) => {
                // this.closeResult = `Closed with: ${result}`;
            },
            (reason) => {
                // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            },
        );
    }
}
