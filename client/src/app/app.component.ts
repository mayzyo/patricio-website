import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { EditorService } from './admin/services/editor.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    @ViewChild("EditorRef", { read: ViewContainerRef }) editorRef?: ViewContainerRef;

    constructor(private editor: EditorService) {}

    ngAfterViewInit(): void {
        if(this.editorRef) {
            this.editor.initialise(this.editorRef);
        } else {
            console.error('Editor not initialised!');
        }
    }

}
