import {
    animation, trigger, animateChild, group,
    transition, animate, style, query, state, keyframes
} from '@angular/animations';

export const cueAnimation = animation([
    animate('600ms ease-out', keyframes([
        style({ bottom: '*' }),
        style({ bottom: '0' }),
        style({ bottom: '*' })
    ]))
]);