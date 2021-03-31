import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';
import * as faker from 'faker';
import { environment } from 'src/environments/environment';
declare var require: any;

const openapi = require('/../openapi.json');

@Injectable()
export class MockModelInterceptor implements HttpInterceptor {
    constructor(private http: HttpClient) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(
            mergeMap(() => {

                if (request.url.startsWith(environment.backend)) {
                    if (request.method == 'GET') {
                        var path = request.url
                            .substring(environment.backend.length, request.url.length)
                            .split('?')[0];

                        const subRoutes = path.split('/');
                        if (subRoutes.length > 2 && !Object.keys(openapi["paths"]).includes(path)) {
                            path = `/${subRoutes[1]}/{id}`;
                        }
                        // path = subRoutes.length > 2 == true ? `/${subRoutes[1]}/{id}` : path;
                        return of(new HttpResponse({ status: 200, body: this.generate(path) }));
                    }
                } else if (request.url.startsWith(environment.media)) {
                    if (request.method == 'GET') {
                        const sizes = ['1080x1080', '1280x720', '600x400', '400x600', '768x1024', '1024x680'];
                        return this.http.get(
                            `http://localhost:5004/generated/${sizes[Math.floor(Math.random() * 6)]}`,
                            // `http://125.49.75.2:30039/generated/${sizes[Math.floor(Math.random() * 6)]}`,
                            { observe: 'response', responseType: 'blob' }
                        );
                    }
                }

                // pass through any requests not handled above
                return next.handle(request);
            }),
            delay(500),
        );
    }

    private generate(path: string) {
        var schema: any = openapi["paths"][path]["get"]["responses"][200]["content"]["text/plain"]["schema"];
        var isArray = schema["type"] == 'array';
        let comp: string[] = isArray ? schema["items"]["$ref"].split('/') : schema["$ref"].split('/');
        var model = openapi["components"]["schemas"][comp[comp.length - 1]]["properties"];

        var data = "";
        for (var propertyName in model) {
            data = data.concat(`"${propertyName}": ${this.buildModel(propertyName, model[propertyName])},`);
        }
        data = `{ ${data.substring(0, data.length - 1)} }`;
        if (isArray) {
            var array = '';
            for (let i = 0; i < 10; i++) {
                array = array.concat(data, ',');
            }
            data = `[ ${array.substring(0, array.length - 1)} ]`;
        }

        return JSON.parse(faker.fake(data));
    }

    private buildModel(name: string, obj: { type: string, format: string, "$ref"?: string, items?: { "$ref": string } }, depth: number = 1) {
        if (name == "id")
            return "\"{{random.uuid}}\"";

        if (obj["$ref"]) {
            if (depth > 2) {
                return null;
            }
            var comp = obj["$ref"].split('/')
            var model = openapi["components"]["schemas"][comp[comp.length - 1]]["properties"];
            var data = "";
            for (var propertyName in model) {
                data = data.concat(`"${propertyName}": ${this.buildModel(propertyName, model[propertyName], depth + 1)},`);
            }
            return `{ ${data.substring(0, data.length - 1)} }`;
        }

        switch (obj.type) {
            case "string":
                return obj.format == "date-time"
                    ? "\"{{date.recent}}\""
                    : "\"{{lorem.sentence}}\"";
            case "integer":
                return "\"{{random.number}}\"";
            case "boolean":
                return "\"{{random.boolean}}\"";
            case "array":
                if(depth > 1) {
                    return null
                }

                var comp = obj.items!["$ref"].split('/')
                var model = openapi["components"]["schemas"][comp[comp.length - 1]]["properties"];
                var data = "";

                for (var propertyName in model) {
                    data = data.concat(`"${propertyName}": ${this.buildModel(propertyName, model[propertyName], depth + 1)},`);
                }
                data = `{ ${data.substring(0, data.length - 1)} }`;
                var array = '';
                for (let i = 0; i < 5; i++) {
                    array = array.concat(data, ',');
                }
                return `[ ${array.substring(0, array.length - 1)} ]`;
            default:
                return null;
        }
    }
}

export let MockModelProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: MockModelInterceptor,
    multi: true
};