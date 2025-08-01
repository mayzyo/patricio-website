import { Injectable, Inject } from '@angular/core';
import { Email } from '../../models/email';
import { Observable, forkJoin, from, iif, of, throwError } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../../core/services/profile.service';
import { AppCheck, getToken } from '@angular/fire/app-check';
import { API_URL } from '../../app.config';

@Injectable({
    providedIn: 'root'
})
export class EmailService {
    constructor(
        @Inject(API_URL) private apiUrl: string,
        private http: HttpClient,
        private profile: ProfileService,
        private appCheck: AppCheck
    ) { }

    sendEmail(email: Email): Observable<string> {
        return forkJoin([
            from(getToken(this.appCheck)),
            this.profile.profile$.pipe(take(1))
        ]).pipe(
            switchMap(([{ token }, { id }]) => this.http.post(
                this.apiUrl.concat('send-mail'),
                { ...email, id },
                { headers: { 'Authorization': token ?? '' }, responseType: 'text' }
            )),
            switchMap(res => iif(() => res == 'success', of(res), throwError(() => 'unsuccessful')))
        );
    }
}
