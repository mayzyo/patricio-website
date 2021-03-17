import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';
import * as faker from 'faker';
import { environment } from 'src/environments/environment';
import { Post } from '../home/models';
import { paths } from '../shared/backend.api';
@Injectable()
export class MockDataInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(
            mergeMap(() => {
                if(request.url.startsWith(environment.backend)) {
                    const body = this.routes(request);
                    return body
                        ? of(
                            new HttpResponse({ 
                                status: 200, 
                                body: body
                            })
                        ) 
                        : next.handle(request);
                }
                // pass through any requests not handled above
                return next.handle(request);
            }),
            delay(500),
        );
    }

    private routes(request: HttpRequest<any>) {
        var path = request.url
            .substring(environment.backend.length, request.url.length)
            .split('?')[0];

        switch(path) {
            case '/Quotes':
                return this.quotes(request);
            case '/Posts':
                return this.posts(request);
            default:
                return null;
            
        }
    }

    private quotes(request: HttpRequest<any>) {
        if(request.method == 'GET') {
            return {
                author: faker.name.findName(),
                message: faker.lorem.sentence()
            };
        } else {
            throw Error('Not Implemented');
        }
    }

    private posts(request: HttpRequest<any>): paths["/Posts"]["get"]["responses"][200]["text/plain"] {
        if(request.method == 'GET') {
            return Array.from({ length: 10 }).map((_, i) => ({
                id: i,
                title: faker.lorem.sentence(),
                content: Math.random() > .5 ? faker.lorem.paragraph() : undefined,
                created: faker.date.past().toString(),
                gallery: Array.from({ length: 1 + Math.floor(Math.random() * 8) })
                    .map(() => 
                        ({ url: 'image-url', type: 0, isVisible: false })
                    )
            }));
        } else {
            throw Error('Not Implemented');
        }
    }
}

export let MockDataProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: MockDataInterceptor,
    multi: true
};