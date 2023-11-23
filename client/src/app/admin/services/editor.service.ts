// import { HttpClient } from '@angular/common/http';
import { Injectable, Type, ViewContainerRef } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Observable, from, throwError } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';

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

    readonly idToken$ = this.initialiseIdToken();

    constructor(private auth: Auth) {
        // this.subscribeToIdToken();
    }

    initialise(editorRef: ViewContainerRef) {
        this.editorRef = editorRef;
    }

    open<T>(componentType: Type<T>) {
        this.editorRef?.clear();
        this.editorRef?.createComponent(componentType);
    }

    private initialiseIdToken(): Observable<string> {
        return user(this.auth).pipe(
            filter(user => user != null),
            switchMap(user => user ? from(user.getIdToken()) : throwError(() => new Error('auth user is null'))),
            shareReplay({ bufferSize: 1, refCount: true })
        );
    }
}
