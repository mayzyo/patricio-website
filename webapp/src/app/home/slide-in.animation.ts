import { animation, animate, style, keyframes } from '@angular/animations';

export const slideInAnimation = animation([
    animate('600ms ease-out', keyframes([
        style({ opacity: 0, transform: 'translateX(-24px)' }),
        style({ opacity: 1, transform: 'translateX(0)' })
    ]))
]);