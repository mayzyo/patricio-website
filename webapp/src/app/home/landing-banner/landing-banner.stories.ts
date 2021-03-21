import { action } from '@storybook/addon-actions';
import { moduleMetadata, Story } from '@storybook/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LandingBannerComponent } from './landing-banner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FamousQuoteService } from '../famous-quote.service';

export default {
    title: 'Home/Landing Banner',
    decorators: [
        moduleMetadata({
            declarations: [LandingBannerComponent],
            imports: [BrowserAnimationsModule, FontAwesomeModule],
        }),
    ],
};

const Template: Story<any> = args => {
    class MockFamousQuoteService implements Partial<FamousQuoteService> {     
        public random() {
          return {
            author: 'Charles Schwab',
            message: 'Be hearty in your approbation and lavish in your praise.'
          }
        }
    }

    return {
        moduleMetadata: {
            providers: [{ provide: FamousQuoteService, useClass: MockFamousQuoteService }]
        },
        component: LandingBannerComponent
    }
};

export const Default = Template.bind({});
Default.args = {

};