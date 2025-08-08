import { Component, input, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faRecordVinyl } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-thumb-remove-button',
    templateUrl: './thumb-remove-button.component.html',
    styleUrl: './thumb-remove-button.component.scss',
    imports: [FontAwesomeModule]
})
export class ThumbRemoveButtonComponent {
    protected readonly faRecordVinyl = faRecordVinyl;

    image = input<string | null | undefined>();
    icon = input<IconDefinition>();
    disabled = input<boolean>(false);

    removeClick = output<void>();
}
