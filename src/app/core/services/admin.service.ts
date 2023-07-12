import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public loggedIn: boolean = false;
  private readonly updateToggle$ = new Subject<string>();

  get toggle$(): Observable<string> {
    return this.updateToggle$;
  }

  constructor() {
    localStorage.getItem('AUTH') && (this.loggedIn = true);
  }

  public open(editorType: string) {
    this.updateToggle$.next(editorType);
  }
}
