import { animation, group, transition, animate, style, query, useAnimation, sequence, stagger, state } from '@angular/animations';

const fadeInList = (targetCSS: string, options?: { params?: any, state?: string }) => [
    transition(`${options && options.state || 'void'} => *`, [
        query(targetCSS, [
            style(options && options.params || {
                opacity: '0',
            }),
            stagger(300, [
                useAnimation(landingFadeIn, {
                    params: options && options.params || {
                        transform: 'translateY(20px)',
                        opacity: '0',
                    }
                })
            ])
        ]),
    ])
];

const fadeInQueried = (targetCSS: string[], options?: { params?: any, state?: string }) => [
    transition(`${options.state} => *`, [
        group(targetCSS.map(el =>
            query(el, [
                style(options && options.params || {
                    opacity: '0',
                }),
            ])
        )),
        sequence(targetCSS.map(el =>
            query(el, [
                useAnimation(landingFadeIn, {
                    params: options && options.params || {
                        transform: 'translateY(20px)',
                        opacity: '0',
                    }
                })
            ])
        ))
    ])
];

export const landingFadeIn = animation([
    style({ transform: '{{ transform }}', opacity: '{{ opacity }}' }),
    group([
        animate('0.3s 0.1s ease', style({
            transform: 'translateY(0)',
        })),
        animate('0.3s ease', style({
            opacity: 1
        }))
    ]),
]);

export const fadeIn = (targetCSS: string[] | string, options?: { params?: any, state?: string }) =>
    (typeof targetCSS == 'string') ? fadeInList(targetCSS, options) : fadeInQueried(targetCSS, options);

export const fadeObject = (start: string, end: string, params?: any) => [
    state(start, style({
        visibility: 'hidden'
    })),
    state(end, style({
        visibility: 'visible'
    }))
]