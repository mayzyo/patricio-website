import { AfterViewInit, ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { EditorModalComponent } from '../editor-modal/editor-modal.component';
import { SongEditorComponent } from '../song-editor/song-editor.component';
import { SongService } from '../../../shared/services/song.service';
import { Song } from '../../../models/song';
import { SongFormService } from '../../services/song-form.service';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-song',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        InfiniteScrollModule,
        EditorModalComponent,
        SongEditorComponent
    ],
    templateUrl: './song.component.html',
    styleUrl: './song.component.scss',
    providers: [SongFormService],
})
export class SongComponent implements AfterViewInit {
    protected readonly songs$ = this.song.list$.pipe(tap(res => console.log('tester', res)));
    protected readonly selected = signal<Song | null>(null);

    constructor(private song: SongService, private songForm: SongFormService) {
        effect(() => {
            const selected = this.selected();
            if(selected != null) {
                this.songForm.assign(selected);
            } else {
                this.songForm.clear();
            }
        });
    }

    ngAfterViewInit(): void {
        this.song.refresh();
    }

    selectSong(song: Song): void {
        this.selected.update(prev => prev?.id == song.id ? null : song);
    }

    protected onScroll(): void {
        
    }

    protected onSaved(): void {
        this.song.refresh();
    }
}
