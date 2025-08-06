import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditorService } from '../../../admin/services/editor.service';

@Component({
    selector: 'app-discography',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './discography.component.html',
    styleUrl: './discography.component.scss',
    standalone: false
})
export class DiscographyComponent {
    protected readonly viewOnly$ = this.editor.viewOnly$;

    constructor(private editor: EditorService) { }

    async openSongEditor() {
        const { SongComponent } = await import("../../../admin/components/song/song.component");
        this.editor.open(SongComponent);
    }
}
