import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, merge, of } from 'rxjs';
import { delay, map, share, shareReplay, switchMap, tap } from 'rxjs/operators';
import { generateAudio } from '../../../test/generators/song';

@Injectable()
export class MusicPlayerService {
    private readonly updateAudio$ = new Subject<string>();
    readonly audio$ = this.initialiseAudio();
    private readonly updateLoading$ = new BehaviorSubject<boolean>(false);
    readonly loading$ = merge(
        this.updateLoading$,
        this.audio$.pipe(map(() => false), shareReplay({ bufferSize: 1, refCount: true }))
    );
    
    loadAudio(audioId: string): void {
        this.updateLoading$.next(true);
        this.updateAudio$.next(audioId);
    }

    private initialiseAudio(): Observable<any> {
        return this.updateAudio$.pipe(
            switchMap(audioId => of(generateAudio()).pipe(delay(2000))),
            share()
        );
    }
}
