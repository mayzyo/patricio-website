import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-media',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './media.component.html',
  styleUrl: './media.component.scss'
})
export class MediaComponent {

}
