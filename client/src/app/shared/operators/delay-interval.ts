import { Observable, OperatorFunction, zip, interval, of, merge } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

export const delayInterval = <T>(frequency: number = 300, trigger?: Observable<void>): OperatorFunction <T, T> => {
    return (source$: Observable<T>) => zip(
        source$,
        trigger
            ? trigger.pipe(
                take(1),
                switchMap(() => merge(of(null), interval(frequency)))
            )
            : interval(frequency)
    ).pipe(
        map(res => res[0])
    );
}