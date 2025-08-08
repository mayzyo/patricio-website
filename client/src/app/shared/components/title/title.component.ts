import { Component, booleanAttribute, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorService } from '../../../admin/services/editor.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faEdit } from '@fortawesome/free-regular-svg-icons';

@Component({
    selector: 'app-title',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './title.component.html',
    styleUrl: './title.component.scss',
    host: { class: 'd-flex align-items-center' }
})
export class TitleComponent {
    text = input<string>('');
    textClass = input<string>('h2');
    altColourEdit = input(false, { transform: booleanAttribute });
    icon = input<IconDefinition>();
    editClick = output<void>();

    protected readonly faEdit = faEdit;
    protected readonly viewOnly$ = this.editor.viewOnly$;

    constructor(private editor: EditorService) {}
}
