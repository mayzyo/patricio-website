import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, merge } from 'rxjs';
import { map, share, shareReplay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { STORAGE_URL } from '../../app.config';

@Injectable()
export class MusicPlayerService {
    private readonly storageUrl = inject(STORAGE_URL);
    private readonly http = inject(HttpClient);
    private readonly sanitizer = inject(DomSanitizer);

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
            switchMap(audioId =>
                this.http.get(this.storageUrl.concat(audioId as string), { responseType: 'blob' }).pipe(
                    map(res => window.URL.createObjectURL(res)),
                    map(res => this.sanitizer.bypassSecurityTrustUrl(res))
                )
            ),
            share()
        );
    }
}
