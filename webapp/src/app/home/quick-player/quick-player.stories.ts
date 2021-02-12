import { moduleMetadata } from '@storybook/angular';
import { QuickPlayerComponent } from './quick-player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from } from 'rxjs';

export default {
    title: 'Home/Quick Player',
    decorators: [
        moduleMetadata({
            // imports both components to allow component composition with storybook
            declarations: [QuickPlayerComponent],
            imports: [BrowserAnimationsModule],
        }),
        (storyFunc: any) => {
            const story = storyFunc();

            return {
                ...story,
                template: `
                    <app-quick-player [backgroundUrl]="backgroundUrl">
                        <p style="z-index: 10; pointer-events: none;">Player Title</p>
                    </app-quick-player>
                `,
            };
        }
    ]
};

export const Default = () => ({
    component: QuickPlayerComponent,
    props: {
        backgroundUrl: 'assets/images/banner-1.jpg'
    }
});