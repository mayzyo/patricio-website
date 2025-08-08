import { Component, inject } from '@angular/core';
import { EditorService } from '../../../admin/services/editor.service';

@Component({
    selector: 'app-media',
    templateUrl: './media.component.html',
    styleUrl: './media.component.scss',
    standalone: false
})
export class MediaComponent {
    private editor = inject(EditorService);

    async openPhotoEditor() {
        const { PhotoComponent } = await import("../../../admin/components/photo/photo.component");
        this.editor.open(PhotoComponent);
    }
}
