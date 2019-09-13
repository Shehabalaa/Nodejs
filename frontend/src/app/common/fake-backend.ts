import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoZWhhYiIsInBhc3N3b3JkIjoic2hlaGFiIiwiYWRtaW4iOnRydWV9.OwKjuyWNMcM1_XUKxuOzMzxDWMJIgbQyeiKPNnw474Q';

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            // authenticate - public
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                const user = request.body;
                if (user.username === 'shehab' && user.password === 'shehab') {
                    user.token = this.token;
                    return ok(user);
                }
                return error();
            }

            // get all users
            if (request.url.endsWith('/users/orders') && request.method === 'GET') {
                const authHeader = (request.headers).get('Authorization');
                const isLoggedIn = authHeader && authHeader.startsWith('Bearer ' + this.token);
                if (!isLoggedIn) { return error(); }
                return ok([1, 2, 3, 4, 5, 6]);
            }

            // pass through any requests not handled above
            return next.handle(request);
        }))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());


        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function error() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

    }
}

export let fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
