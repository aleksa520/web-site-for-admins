import { Component } from '@angular/core';

import { AccountService } from './_services';
import { Admin } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    admin: Admin;

    constructor(private accountService: AccountService) {
        this.accountService.admin.subscribe(x => this.admin = x);
    }

    logout() {
        this.accountService.logout();
    }
}