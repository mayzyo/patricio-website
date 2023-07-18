import { Component, Input } from '@angular/core';
import { Quote } from 'src/app/models/quote';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {
    @Input() quote: Quote | null = null;
    @Input() backgroundUrl?: string;
    @Input() altColour?: string;

    onStyle() {
        return {
            'background-color': this.altColour,
            'background-image': `url(../../assets/images/${this.backgroundUrl})`,
            'background-size': 'cover',
            'background-position': '50% 75%',
            height: '55vh'
        };
    }
}
