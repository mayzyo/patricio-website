import { Observable, OperatorFunction, zip, interval, of, merge } from 'rxjs';
import { concatMap, delay, map, switchMap, take } from 'rxjs/operators';

export const delayInterval = <T>(frequency: number = 300, trigger?: Observable<void>): OperatorFunction <T, T> => {
    return (source$: Observable<T>) => trigger != undefined
        ? zip(
            source$,
            trigger!.pipe(
                take(1),
                switchMap(() => merge(of(null), interval(frequency)))
            )
        ).pipe(map(res => res[0]))
        : source$.pipe(
            concatMap(res =>
                of(res).pipe(delay(300))
            )
        );
}