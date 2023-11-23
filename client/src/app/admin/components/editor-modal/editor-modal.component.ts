import { AfterViewInit, ChangeDetectionStrategy, Component, ComponentRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-editor-modal',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgbModalModule],
    templateUrl: './editor-modal.component.html',
    styleUrl: './editor-modal.component.scss'
})
export class EditorModalComponent implements AfterViewInit {
    @ViewChild('content') content?: ComponentRef<HTMLElement>;

    constructor(protected modal: NgbModal) { }

    ngAfterViewInit() {
        if (!this.content) {
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
