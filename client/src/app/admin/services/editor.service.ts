import { Injectable, Type, ViewContainerRef } from '@angular/core';
import { Auth, idToken, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EditorService {
    private editorRef?: ViewContainerRef;
    readonly viewOnly$ = user(this.auth).pipe(
        map(res => res == null),
        shareReplay(1)
    );

    readonly idToken$ = this.initialiseIdToken();

    constructor(private auth: Auth) { }

    initialise(editorRef: ViewContainerRef) {
        this.editorRef = editorRef;
    }

    open<T>(componentType: Type<T>) {
        this.editorRef?.clear();
        this.editorRef?.createComponent(componentType);
    }

    private initialiseIdToken(): Observable<string> {
        return idToken(this.auth).pipe(
            filter(idToken => idToken != null),
            map(idToken => idToken as string),
            shareReplay({ bufferSize: 1, refCount: true })
        );
    }
}
