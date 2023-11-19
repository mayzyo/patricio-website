// import { HttpClient } from '@angular/common/http';
import { Injectable, ViewContainerRef } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { map, shareReplay, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EditorService {
    private editorRef?: ViewContainerRef;
    readonly viewOnly$ = user(this.auth).pipe(
        tap(res => console.log('auth', res)),
        map(res => res == null),
        shareReplay(1)
    );

    constructor(private auth: Auth) {
        // this.subscribeToIdToken();
    }
}
