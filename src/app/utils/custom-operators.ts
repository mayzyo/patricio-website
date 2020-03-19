import { Observable, OperatorFunction, BehaviorSubject, zip, interval, of, merge } from 'rxjs';
import { map, switchMap, skipWhile, withLatestFrom, scan, pluck, take } from 'rxjs/operators';

// DEPRECATED
export const continuous = <T>(origin: (params: { page: string, size: string }) => Observable<T[]>, size: number = 10): OperatorFunction <number, T[]> => {
    return (source$: BehaviorSubject<number>) => source$.pipe(
        map(res => ({ page: res.toString(), size: size.toString() })),
        switchMap(res => origin(res).pipe(
            skipWhile(x => (x == null || x.length == 0) && source$.value != 1)
        )),
        withLatestFrom(source$),
        scan<[T[], number], T[]>((acc, [cur, page]) => page == 1 ? cur : acc.concat(cur), []),
    );
}

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
        pluck('0')
    );
}