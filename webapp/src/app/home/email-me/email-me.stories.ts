import { moduleMetadata, Story } from '@storybook/angular';
import { EmailService } from 'src/app/shared/email.service';
import { Email } from '../models';
import { EmailMeComponent } from './email-me.component';

export default {
    title: 'Home/Email Me',
    decorators: [
        moduleMetadata({
            declarations: [EmailMeComponent],
        }),
    ],
};

const model: any = {};

const Template: Story<Email> = args => {
    Object.assign(model, args);
    class MockEmailService implements Partial<EmailService> {
        readonly model: Email = model;

        submit() {

        }

        reset() {

        }
    }

    return {
        moduleMetadata: {
            providers: [{ provide: EmailService, useClass: MockEmailService }]
        },
        component: EmailMeComponent
    }
};

export const Default = Template.bind({});
Default.args = {
    title: '',
    template: '',
    address: '',
    message: ''
};