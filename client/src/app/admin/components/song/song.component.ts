import { AfterViewInit, ChangeDetectionStrategy, Component, effect, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { EditorModalComponent } from '../editor-modal/editor-modal.component';
import { SongEditorComponent } from '../song-editor/song-editor.component';
import { SongService } from '../../../shared/services/song.service';
import { Song } from '../../../models/song';
import { SongFormService } from '../../services/song-form.service';
import { ImageDefaultDirective } from '../../../shared/directives/image-default.directive';
import { EditorAction } from '../../interfaces/editor-action';

@Component({
    selector: 'app-song',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        InfiniteScrollModule,
        EditorModalComponent,
        SongEditorComponent,
        ImageDefaultDirective
    ],
    templateUrl: './song.component.html',
    styleUrl: './song.component.scss',
    providers: [SongFormService]
})
export class SongComponent implements AfterViewInit {
    protected readonly songs$ = this.song.list$;

    protected readonly selected = signal<Song | null>(null);

    constructor(private song: SongService, private songForm: SongFormService) {
        this.RespondToSelection();
    }

    ngAfterViewInit(): void {
        this.song.refresh();
    }

    selectSong(song: Song): void {
        this.selected.update(prev => prev?.id == song.id ? null : song);
    }

    protected onScroll(): void {
        this.song.load();
    }

    protected onAction(action: EditorAction): void {
        if(action.clearSelection) {
            this.selected.set(null);
        }

        this.song.refresh();
    }

    private RespondToSelection(): void {
        effect(() => {
            const selected = this.selected();
            
            if(selected != null) {
                untracked(() => this.songForm.assign(selected));
            } else {
                untracked(() => this.songForm.clear());
            }
        });
    }
}
