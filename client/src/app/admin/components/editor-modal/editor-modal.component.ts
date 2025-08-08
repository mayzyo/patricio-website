import { AfterViewInit, Component, ComponentRef, inject, viewChild } from '@angular/core';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-editor-modal',
    imports: [NgbModalModule],
    templateUrl: './editor-modal.component.html',
    styleUrl: './editor-modal.component.scss'
})
export class EditorModalComponent implements AfterViewInit {
    private modal = inject(NgbModal);

    content = viewChild<ComponentRef<HTMLElement>>('content');

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
