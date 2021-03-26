import { Component } from '@angular/core';

import { Admin } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    admin: Admin;

    constructor(private accountService: AccountService) {
        this.admin = this.accountService.adminValue;
    }
}