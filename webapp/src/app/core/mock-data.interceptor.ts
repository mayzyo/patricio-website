import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, tap } from 'rxjs/operators';
import * as faker from 'faker';
declare var require: any;

const openapi = require('/../openapi.json');

@Injectable()
export class MockDataInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(
            mergeMap(() => {
                if (request.method == 'GET')
                    return of(new HttpResponse({ status: 200, body: this.generate(request.url.split('?')[0] as any) }));
                // if (request.url.endsWith('/api/profile') && request.method === 'GET') {
                //     return of(new HttpResponse({ status:200, body:ProfileSchema() }));
                // }
                // if (request.url.endsWith('/api/organisation/institute') && request.method === 'GET') {
                //     return of(new HttpResponse({ status:200, body:OrganisationSchema() }));
                // }
                // if (request.url.endsWith('/api/organisation/company') && request.method === 'GET') {
                //     return of(new HttpResponse({ status:200, body:OrganisationSchema(3) }));
                // }
                // if (request.url.match(/\/api\/timeline/) && request.method === 'GET') {
                //     // find user by id in users array
                //     let urlParts = request.url.split('name=');
                //     let id = urlParts[1];
                //     return of(new HttpResponse({ status:200, body:TimelineSchema(id) }));
                // }

                // // get user by id
                // if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'GET') {
                //     // find user by id in users array
                //     let urlParts = request.url.split('/');
                //     let id = parseInt(urlParts[urlParts.length - 1]);
                //     // let matchedUsers = users.filter(user => { return user.id === id; });
                //     // let user = matchedUsers.length ? matchedUsers[0] : null;

                //     return of(new HttpResponse({ status: 200, body: {} }));
                // }

                // pass through any requests not handled above
                return next.handle(request);
            }),
            // tap(val => console.log(val)),
            // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            delay(500),
        );
    }

    generate(path: string) {
        var schema: any = openapi["paths"][path]["get"]["responses"][200]["content"]["text/plain"]["schema"];
        var comp: string[] = schema["items"]["$ref"].split('/');
        var isArray = schema["type"] == 'array';
        var model = openapi["components"]["schemas"][comp[comp.length - 1]]["properties"];

        var data = "";
        for (var propertyName in model) {
            data = data.concat(`"${propertyName}": "${this.buildModel(propertyName, model[propertyName])}",`);
        }
        data = `{ ${data.substring(0, data.length - 1)} }`;

        if(isArray) {
            var array = '';
            for (let i = 0; i < 3; i++) {
                array = array.concat(data, ',');
            }
            data = `[ ${array.substring(0, array.length - 1)} ]`;
        }

        return JSON.parse(faker.fake(data));
    }

    buildModel(name: string, obj: { type: string, format: string }) {
        if (name == "id")
            return "{{random.uuid}}";
        switch (obj.type) {
            case "string":
                return obj.format == "date-time"
                    ? "{{date.recent}}"
                    : "{{lorem.sentence}}";
            case "integer":
                return "{{random.number}}";
            case "boolean":
                return "{{random.boolean}}";
            default:
                return "N/A";
        }
    }
}

export let MockDataProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: MockDataInterceptor,
    multi: true
};