import { Component, inject } from '@angular/core';
import { EditorService } from '../../../admin/services/editor.service';

@Component({
    selector: 'app-discography',
    templateUrl: './discography.component.html',
    styleUrl: './discography.component.scss',
    standalone: false
})
export class DiscographyComponent {
    private editor = inject(EditorService);

    protected readonly viewOnly$ = this.editor.viewOnly$;

    async openSongEditor() {
        const { SongComponent } = await import("../../../admin/components/song/song.component");
        this.editor.open(SongComponent);
    }
}
