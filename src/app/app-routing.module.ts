import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { ItemComponent } from './items/item/item.component';
import { ItemsComponent } from './items/items.component';
import { OrderComponent } from './orders/customerorder/customerorder.component';
import { OrdersComponent } from './orders/orders.component';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },

    // otherwise redirect to home
  //  { path: '**', redirectTo: '' },
    {path:'',redirectTo:'orders',pathMatch: 'full'},
    {path:'orders',component:OrdersComponent},
    {path:'customerorder', children:[
    {path:'',component:OrderComponent}]},
    {path:'items',component:ItemsComponent},
    {path:'item', children:[
      {path:'',component:ItemComponent},
      {path:':id',component:ItemComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }