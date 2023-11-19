import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorService } from '../../../admin/services/editor.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faEdit } from '@fortawesome/free-regular-svg-icons';

@Component({
    selector: 'app-title',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './title.component.html',
    styleUrl: './title.component.scss',
    host: {
        class: 'd-flex align-items-center'
    }
})
export class TitleComponent {
    @Input() text = '';
    @Input() icon?: IconDefinition;
    @Output() editClick = new EventEmitter<void>();

    protected readonly faEdit = faEdit;
    protected readonly viewOnly$ = this.editor.viewOnly$;

    constructor(private editor: EditorService) {}
}
