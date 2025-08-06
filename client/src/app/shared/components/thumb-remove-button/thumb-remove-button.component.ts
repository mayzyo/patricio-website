import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faRecordVinyl } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-thumb-remove-button',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './thumb-remove-button.component.html',
    styleUrl: './thumb-remove-button.component.scss',
    imports: [FontAwesomeModule]
})
export class ThumbRemoveButtonComponent {
    protected readonly faRecordVinyl = faRecordVinyl;

    @Input() image?: string | null;
    @Input() icon?: IconDefinition;
    @Input() disabled = false;
    
    @Output() removeClick = new EventEmitter<void>();
}
