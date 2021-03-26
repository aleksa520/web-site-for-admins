import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Admin } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private adminSubject: BehaviorSubject<Admin>;
    public admin: Observable<Admin>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.adminSubject = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('admin')));
        this.admin = this.adminSubject.asObservable();
    }

    public get adminValue(): Admin {
        return this.adminSubject.value;
    }

    login(username: any, password: any) {
        return this.http.post<Admin>(`${environment.apiUrl}/admins/authenticate`, { username, password })
            .pipe(map(admin => {
                localStorage.setItem('admin', JSON.stringify(admin));
                this.adminSubject.next(admin);
                return admin;
            }));
    }

    logout() {
        localStorage.removeItem('admin');
        this.adminSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(admin: Admin) {
        return this.http.post(`${environment.apiUrl}/admins/register`, admin);
    }

    getAll() {
        return this.http.get<Admin[]>(`${environment.apiUrl}/admins`);
    }

    getById(id: string) {
        return this.http.get<Admin>(`${environment.apiUrl}/admins/${id}`);
    }
}