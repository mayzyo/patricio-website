import { Injectable, ViewContainerRef, Type } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EditorService {
    private editorRef?: ViewContainerRef;
    protected readonly canEdit$ = user(this.auth).pipe(
        map(res => res != null),
        shareReplay(1)
    );

    constructor(private auth: Auth) { }
    
    initialise(editorRef: ViewContainerRef) {
        this.editorRef = editorRef;
    }

    open<T>(componentType: Type<T>) {
        this.editorRef?.clear();
        this.editorRef?.createComponent(componentType);
    }
}
