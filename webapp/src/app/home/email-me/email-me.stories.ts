import { HttpClientModule } from '@angular/common/http';
import { moduleMetadata } from '@storybook/angular';
import { MockDataProvider } from 'src/app/core/mock-data.interceptor';
import { EmailMeComponent } from './email-me.component';

export default {
    title: 'Home/Email Me',
    decorators: [
        moduleMetadata({
            // imports both components to allow component composition with storybook
            declarations: [EmailMeComponent],
            imports: [HttpClientModule],
            providers: [MockDataProvider]
        }),
    ],
};

export const Default = () => ({
    component: EmailMeComponent,
});