import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { fakeBackendProvider } from './_helpers';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule} from '@angular/forms';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/customerorder/customerorder.component';
import { OrderService } from './_services/customerorder.service';
import { MatDialogModule} from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { ItemsComponent } from './items/items.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ItemComponent } from './items/item/item.component';
import { RouterModule } from '@angular/router';
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        ToastrModule.forRoot(),
        Ng2SearchPipeModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        OrdersComponent,
        OrderComponent,
        ItemsComponent,
        ItemComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        fakeBackendProvider,
        [OrderService]
    ],
    bootstrap: [AppComponent],
    exports: [RouterModule]
})
export class AppModule { };