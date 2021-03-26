import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

const adminsKey = 'web-site-for-admins';
let admins = JSON.parse(localStorage.getItem(adminsKey)) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/admins/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/admins/register') && method === 'POST':
                    return register();
                case url.endsWith('/admins') && method === 'GET':
                    return getUsers();
                case url.match(/\/admins\/\d+$/) && method === 'GET':
                    return getUserById();
                default:
                    return next.handle(request);
            }    
        }

        function authenticate() {
            const { username, password } = body;
            const admin = admins.find(x => x.username === username && x.password === password);
            if (!admin) return error('Username or password is incorrect');
            return ok({
                ...basicDetails(admin),
                token: 'fake-jwt-token'
            })
        }

        function register() {
            const admin = body

            if (admins.find(x => x.username === admin.username)) {
                return error('Username "' + admin.username + '" is already taken')
            }

            admin.id = admins.length ? Math.max(...admins.map(x => x.id)) + 1 : 1;
            admins.push(admin);
            localStorage.setItem(adminsKey, JSON.stringify(admins));
            return ok();
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(admins.map(x => basicDetails(x)));
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            const admin = admins.find(x => x.id === idFromUrl());
            return ok(basicDetails(admin));
        }

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function error(message) {
            return throwError({ error: { message } })
                .pipe(materialize(), delay(500), dematerialize()); 
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorized' } })
                .pipe(materialize(), delay(500), dematerialize());
        }

        function basicDetails(admin) {
            const { id, username, firstName, lastName } = admin;
            return { id, username, firstName, lastName };
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};