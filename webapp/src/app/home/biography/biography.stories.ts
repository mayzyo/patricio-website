import { HttpClientModule } from '@angular/common/http';
import { moduleMetadata } from '@storybook/angular';
import { MockDataProvider } from 'src/app/core/mock-data.interceptor';
import { BiographyComponent } from './biography.component';

export default {
    title: 'Home/Biography',
    decorators: [
        moduleMetadata({
            // imports both components to allow component composition with storybook
            declarations: [BiographyComponent],
            imports: [HttpClientModule],
            providers: [MockDataProvider]
        }),
    ],
};

export const Default = () => ({
    component: BiographyComponent,
});