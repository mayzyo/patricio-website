import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { EditorModalComponent } from '../editor-modal/editor-modal.component';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';
import { EditorAction } from '../../interfaces/editor-action';
import { PhotoFormService } from '../../services/photo-form.service';

@Component({
    selector: 'app-photo',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        InfiniteScrollModule,
        EditorModalComponent,
        PhotoEditorComponent
    ],
    templateUrl: './photo.component.html',
    styleUrl: './photo.component.scss',
    providers: [PhotoFormService]
})
export class PhotoComponent {
    protected onAction(action: EditorAction): void {

    }
}
