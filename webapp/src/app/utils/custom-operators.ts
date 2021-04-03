import { Observable, OperatorFunction, zip, interval, of, merge, from } from 'rxjs';
import { switchMap, pluck, take, switchMapTo } from 'rxjs/operators';

export const sequence = <T>(frequency: number = 300, trigger?: Observable<unknown>): OperatorFunction<T[], T> => (source: Observable<T[]>) => zip(
    source.pipe(
        switchMap(res => from(res))
    ),
    trigger
        ? trigger.pipe(
            take(1),
            switchMapTo(merge(of(null), interval(frequency)))
        )
        : interval(frequency)
).pipe(
    pluck('0')
);

export const clearWhen = <T>(trigger: Observable<unknown>): OperatorFunction<T[], T[]> => 
(source: Observable<T[]>) => merge(of(null), trigger).pipe(
    switchMapTo(
        merge(of(new Array<T>()), source)
    )
);