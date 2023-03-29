import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly apiUrl = `${environment.apiUrl}/auth`;

    private readonly tokenKey = 'jwt';

    private isAuthenticatedSubject = new BehaviorSubject<boolean>(
        this.isAuthenticated()
    );

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<string> {
        const payload = { username, password };
        return this.http.post<string>(`${this.apiUrl}/login`, payload).pipe(
            tap((response: any) => {
                localStorage.setItem(this.tokenKey, response.token);
            }),
            tap(() => this.isAuthenticatedSubject.next(true))
        );
    }
    //   login(username: string,password: string) {
    //     return this.http.post(this.apiUrl+'/login', {username,password});
    //   }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
        this.isAuthenticatedSubject.next(false);
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem(this.tokenKey);
        return token !== null;
    }

    isAuthenticated$(): Observable<boolean> {
        return this.isAuthenticatedSubject.asObservable();
    }

    getToken(): any {
        return localStorage.getItem(this.tokenKey);
    }
}
