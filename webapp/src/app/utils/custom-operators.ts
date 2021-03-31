import { Observable, OperatorFunction, zip, interval, of, merge, from } from 'rxjs';
import { switchMap, pluck, take } from 'rxjs/operators';

export const sequence = <T>(frequency: number = 300, trigger?: Observable<void>): OperatorFunction <T[], T> => {
    return (source: Observable<T[]>) => zip(
        source.pipe(
            switchMap(res => from(res))
        ),
        trigger
            ? trigger.pipe(
                take(1),
                switchMap(() => merge(of(null), interval(frequency)))
            )
            : interval(frequency)
    ).pipe(
        pluck('0')
    );
};