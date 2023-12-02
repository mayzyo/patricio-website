import { Injectable } from '@angular/core';
import { Email } from '../../models/email';
import { Observable, forkJoin, from } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../../core/services/profile.service';
import { AppCheck, getToken } from '@angular/fire/app-check';

@Injectable({
    providedIn: 'root'
})
export class EmailService {
    constructor(
        private http: HttpClient,
        private profile: ProfileService,
        private appCheck: AppCheck
    ) { }

    sendEmail(email: Email): Observable<void> {
        return forkJoin([
            from(getToken(this.appCheck)),
            this.profile.profile$.pipe(take(1))
        ]).pipe(
            switchMap(([{ token }, { id }]) => this.http.post<void>(
                'https://patricio-website-admin-dev.azurewebsites.net/api/send-mail',
                { ...email, id },
                { headers: { 'Authorization': token ?? '' } }
            ))
        );
    }

    tester(): Observable<any> {
        return from(getToken(this.appCheck));
    }
}
