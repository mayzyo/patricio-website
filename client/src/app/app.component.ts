import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { MainModule } from './main/main.module';
import { HomeModule } from './home/home.module';
import { EditorService } from './admin/services/editor.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CoreModule, HomeModule, MainModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
