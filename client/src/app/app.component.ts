import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { MainModule } from './main/main.module';
import { HomeModule } from './home/home.module';
import { EditorService } from './admin/services/editor.service';
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, CoreModule, HomeModule, MainModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    @ViewChild("EditorRef", { read: ViewContainerRef }) editorRef?: ViewContainerRef;

    routeLoading$ = this.router.events.pipe(
        filter(event => event instanceof RouteConfigLoadStart || event instanceof RouteConfigLoadEnd),
        map(event => event instanceof RouteConfigLoadStart)
    );

    constructor(private router: Router, private editor: EditorService) {}

    ngAfterViewInit(): void {
        if(this.editorRef) {
            this.editor.initialise(this.editorRef);
        } else {
            console.error('Editor not initialised!');
        }
    }
}
