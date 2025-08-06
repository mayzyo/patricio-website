import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditorService } from '../../../admin/services/editor.service';

@Component({
    selector: 'app-media',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './media.component.html',
    styleUrl: './media.component.scss',
    standalone: false
})
export class MediaComponent {
    constructor(private editor: EditorService) { }

    async openPhotoEditor() {
        const { PhotoComponent } = await import("../../../admin/components/photo/photo.component");
        this.editor.open(PhotoComponent);
    }
}
