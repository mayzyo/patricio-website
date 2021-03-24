import { animation, animate, style, keyframes } from '@angular/animations';

export const pressDownAnimation = animation([
    animate('600ms ease-in', keyframes([
        style({ opacity: 0 }),
        style({ opacity: 1, transform: 'scale(1.03)' }),
        style({ transform: 'scale(1)' })
    ]))
]);