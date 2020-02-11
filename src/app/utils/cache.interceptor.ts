import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from '../services/cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    constructor(
        private cache: CacheService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.endsWith('/api/media/gallery') || request.url.endsWith('/api/music/cover')) {

            request = request.clone({
                headers: new HttpHeaders({
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
                })
            });
            console.log('tester', request);
            console.log('tester', this.cache.cache);
            const cachedResponse = this.cache.get(request);
            return cachedResponse ? of(cachedResponse) : this.sendRequest(request, next);
        }
        return next.handle(request);
    }

    private sendRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    this.cache.put(request, event);
                }
            })
        );
    }
}

export let cacheProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: CacheInterceptor,
    multi: true
};