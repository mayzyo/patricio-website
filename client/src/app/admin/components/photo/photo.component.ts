import { AfterViewInit, ChangeDetectionStrategy, Component, effect, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { EditorModalComponent } from '../editor-modal/editor-modal.component';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';
import { EditorAction } from '../../interfaces/editor-action';
import { PhotoFormService } from '../../services/photo-form.service';
import { PhotoService } from '../../../shared/services/photo.service';
import { Photo } from '../../../models/photo';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-photo',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        InfiniteScrollModule,
        FontAwesomeModule,
        EditorModalComponent,
        PhotoEditorComponent
    ],
    templateUrl: './photo.component.html',
    styleUrl: './photo.component.scss',
    providers: [PhotoFormService]
})
export class PhotoComponent implements AfterViewInit {
    protected readonly faVideo = faVideo;
    
    protected readonly photos$ = this.photo.list$;

    protected readonly selected = signal<Photo | null>(null);

    constructor(private photo: PhotoService, private photoForm: PhotoFormService) {
        this.RespondToSelection();
    }

    ngAfterViewInit(): void {
        this.photo.refresh();
    }

    selectPhoto(photo: Photo): void {
        this.selected.update(prev => prev?.id == photo.id ? null : photo);
    }

    protected onScroll(): void {
        this.photo.load();
    }

    protected onAction(action: EditorAction): void {
        if(action.clearSelection) {
            this.selected.set(null);
        }

        this.photo.refresh();
    }

    private RespondToSelection(): void {
        effect(() => {
            const selected = this.selected();

            if(selected != null) {
                untracked(() => this.photoForm.assign(selected));
            } else {
                untracked(() => this.photoForm.clear());
            }
        });
    }
}
