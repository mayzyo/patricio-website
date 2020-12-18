import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';
import { ScrollableLabelsComponent } from './scrollable-labels.component';

export default {
    title: 'Scrollable Labels',
    excludeStories: /.*Data$/,
    decorators: [
        moduleMetadata({
            // imports both components to allow component composition with storybook
            declarations: [ScrollableLabelsComponent],
        }),
    ],
};

export const Default = () => ({
    component: ScrollableLabelsComponent,
    template: `
        <app-scrollable-labels>
            <div class="label">Scrollable Label #1</div>
            <div class="label">Scrollable Label #2</div>
            <div class="label">Scrollable Label #3</div>
            <div class="label">Scrollable Label #4</div>
            <div class="label">Scrollable Label #5</div>
            <div class="label">Scrollable Label #6</div>
            <div class="label">Scrollable Label #7</div>
            <div class="label">Scrollable Label #8</div>
            <div class="label">Scrollable Label #9</div>
            <div class="label">Scrollable Label #10</div>
        </app-scrollable-labels>
        <style>
            .label {
                color: red;
                margin: 0 12px;
            }
        </style>
    `
});